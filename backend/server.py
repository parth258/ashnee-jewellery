from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import certifi
import os
import asyncio
import html as html_lib
import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env', override=True)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, tlsCAFile=certifi.where())
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

SMTP_HOST = os.environ.get('SMTP_HOST', 'smtp.hostinger.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '465'))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', SMTP_USER)
ALERT_EMAIL = os.environ.get('ALERT_EMAIL', SMTP_USER)

logger = logging.getLogger("ashnee")


def _alert_html(title: str, rows: list, image_url: str = "") -> str:
    rows_html = "".join(
        f'<tr><td style="padding:10px 16px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#963E35;border-bottom:1px solid #E8DCD0;">{k}</td>'
        f'<td style="padding:10px 16px;font-size:14px;color:#2A1F1D;border-bottom:1px solid #E8DCD0;">{v}</td></tr>'
        for k, v in rows
    )
    image_html = ""
    if image_url:
        image_html = (
            '<tr><td style="padding:28px 32px 0;">'
            f'<img src="{html_lib.escape(image_url)}" alt="Product" width="180" '
            'style="display:block;width:180px;height:auto;border:1px solid #DBCDC0;" />'
            '</td></tr>'
        )
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6EDE2;padding:32px 0;">'
        '<tr><td align="center">'
        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #DBCDC0;">'
        '<tr><td style="background:#963E35;padding:24px 32px;">'
        '<span style="font-family:Georgia,serif;font-size:20px;letter-spacing:6px;color:#F6EDE2;">ASHNEE</span>'
        '<div style="font-size:9px;letter-spacing:3px;color:#D4AF37;text-transform:uppercase;margin-top:4px;">A Bond of Blessing</div>'
        '</td></tr>'
        f'<tr><td style="padding:28px 32px 8px;"><div style="font-family:Georgia,serif;font-size:22px;color:#2A1F1D;">{title}</div></td></tr>'
        f'{image_html}'
        '<tr><td style="padding:12px 32px 32px;">'
        f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #DBCDC0;">{rows_html}</table>'
        '</td></tr>'
        '<tr><td style="background:#F6EDE2;padding:16px 32px;font-size:11px;color:#5C4B49;">Ashnee Jewels &middot; notification from your website</td></tr>'
        '</table></td></tr></table>'
    )


def fire_alert(subject: str, html: str, reply_to: str = ""):
    if not SMTP_USER or not SMTP_PASSWORD or not ALERT_EMAIL:
        logger.warning("Email alert skipped: SMTP_USER, SMTP_PASSWORD, or ALERT_EMAIL not configured")
        return

    def _send():
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = SENDER_EMAIL
        msg["To"] = ALERT_EMAIL
        if reply_to:
            msg["Reply-To"] = reply_to
        msg.attach(MIMEText(html, "html"))
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SENDER_EMAIL, [ALERT_EMAIL], msg.as_string())

    async def _task():
        try:
            await asyncio.to_thread(_send)
            logger.info(f"Alert email sent: {subject}")
        except Exception as e:
            logger.error(f"Failed to send alert email: {e}")

    asyncio.create_task(_task())

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsletterCreate(BaseModel):
    email: str = Field(min_length=3, max_length=320)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    message: str
    productName: str = ""
    productImage: str = ""
    sent_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=3, max_length=320)
    phone: str = Field(default="", max_length=30)
    message: str = Field(min_length=1, max_length=4000)
    productName: str = Field(default="", max_length=200)
    productImage: str = Field(default="", max_length=2000)


@api_router.get("/")
async def root():
    return {"message": "Ashnee API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/newsletter")
async def subscribe_newsletter(input: NewsletterCreate):
    email = input.email.strip().lower()
    if "@" not in email or "." not in email.split("@")[-1]:
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")
    existing = await db.newsletter_subscribers.find_one({"email": email})
    if existing:
        return {"message": "You are already on our list. Blessings!"}
    sub = NewsletterSubscriber(email=email)
    doc = sub.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    await db.newsletter_subscribers.insert_one(doc)
    fire_alert(
        "New Ashnee Newsletter Subscriber",
        _alert_html("New Newsletter Subscriber", [("Email", html_lib.escape(email))]),
    )
    return {"message": "Welcome to the Ashnee family."}

@api_router.get("/newsletter", response_model=List[NewsletterSubscriber])
async def list_newsletter():
    subs = await db.newsletter_subscribers.find({}, {"_id": 0}).to_list(1000)
    for s in subs:
        if isinstance(s['subscribed_at'], str):
            s['subscribed_at'] = datetime.fromisoformat(s['subscribed_at'])
    return subs


@api_router.post("/contact")
async def send_contact(input: ContactCreate):
    msg = ContactMessage(**input.model_dump())
    doc = msg.model_dump()
    doc['sent_at'] = doc['sent_at'].isoformat()
    await db.contact_messages.insert_one(doc)

    rows = [
        ("Name", html_lib.escape(msg.name)),
        ("Email", html_lib.escape(msg.email)),
        ("Phone", html_lib.escape(msg.phone) or "—"),
    ]
    if msg.productName:
        rows.append(("Product", html_lib.escape(msg.productName)))
    rows.append(("Message", html_lib.escape(msg.message)))

    fire_alert(
        f"New Ashnee Enquiry from {msg.name}",
        _alert_html("New Contact Enquiry", rows, image_url=msg.productImage),
        reply_to=msg.email,
    )
    return {"message": "Thank you for writing to us. We will respond within 24 hours."}

@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact():
    msgs = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    for m in msgs:
        if isinstance(m['sent_at'], str):
            m['sent_at'] = datetime.fromisoformat(m['sent_at'])
    return msgs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
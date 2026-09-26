require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

const SMTP_HOST = process.env.SMTP_HOST || "smtp.hostinger.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
const SENDER_EMAIL = process.env.SENDER_EMAIL || SMTP_USER;
const ALERT_EMAIL = process.env.ALERT_EMAIL || SMTP_USER;

const CORS_ORIGINS = (process.env.CORS_ORIGINS || "*")
  .split(",")
  .map((o) => o.trim());

if (!MONGO_URL || !DB_NAME) {
  console.error("Missing MONGO_URL or DB_NAME in environment. Exiting.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Mongo
// ---------------------------------------------------------------------------
const mongoClient = new MongoClient(MONGO_URL);
let db;

async function connectDB() {
  await mongoClient.connect();
  db = mongoClient.db(DB_NAME);
  console.log("Connected to MongoDB:", DB_NAME);
}

// ---------------------------------------------------------------------------
// Mailer
// ---------------------------------------------------------------------------
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports (587 = STARTTLS)
  auth: SMTP_USER && SMTP_PASSWORD ? { user: SMTP_USER, pass: SMTP_PASSWORD } : undefined,
});

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function alertHtml(title, rows, imageUrl = "") {
  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 16px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#963E35;border-bottom:1px solid #E8DCD0;">${k}</td>` +
        `<td style="padding:10px 16px;font-size:14px;color:#2A1F1D;border-bottom:1px solid #E8DCD0;">${v}</td></tr>`
    )
    .join("");

  const imageHtml = imageUrl
    ? `<tr><td style="padding:28px 32px 0;">` +
      `<img src="${escapeHtml(imageUrl)}" alt="Product" width="180" ` +
      `style="display:block;width:180px;height:auto;border:1px solid #DBCDC0;" />` +
      `</td></tr>`
    : "";

  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6EDE2;padding:32px 0;">` +
    `<tr><td align="center">` +
    `<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #DBCDC0;">` +
    `<tr><td style="background:#963E35;padding:24px 32px;">` +
    `<span style="font-family:Georgia,serif;font-size:20px;letter-spacing:6px;color:#F6EDE2;">ASHNEE</span>` +
    `<div style="font-size:9px;letter-spacing:3px;color:#D4AF37;text-transform:uppercase;margin-top:4px;">A Bond of Blessing</div>` +
    `</td></tr>` +
    `<tr><td style="padding:28px 32px 8px;"><div style="font-family:Georgia,serif;font-size:22px;color:#2A1F1D;">${title}</div></td></tr>` +
    `${imageHtml}` +
    `<tr><td style="padding:12px 32px 32px;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #DBCDC0;">${rowsHtml}</table>` +
    `</td></tr>` +
    `<tr><td style="background:#F6EDE2;padding:16px 32px;font-size:11px;color:#5C4B49;">Ashnee Jewels &middot; notification from your website</td></tr>` +
    `</table></td></tr></table>`
  );
}

async function fireAlert(subject, html, replyTo = "") {
  if (!SMTP_USER || !SMTP_PASSWORD || !ALERT_EMAIL) {
    console.warn("Email alert skipped: SMTP_USER, SMTP_PASSWORD, or ALERT_EMAIL not configured");
    return;
  }
  try {
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: ALERT_EMAIL,
      subject,
      html,
      replyTo: replyTo || undefined,
    });
    console.log("Alert email sent:", subject);
  } catch (err) {
    console.error("Failed to send alert email:", err.message);
  }
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGINS.includes("*") ? "*" : CORS_ORIGINS,
    credentials: true,
  })
);

const router = express.Router();

// GET /api/
router.get("/", (req, res) => {
  res.json({ message: "Ashnee API" });
});

// ---- status checks ----------------------------------------------------
router.post("/status", async (req, res) => {
  const { client_name } = req.body || {};
  if (!client_name) {
    return res.status(422).json({ detail: "client_name is required" });
  }
  const doc = {
    id: uuidv4(),
    client_name,
    timestamp: new Date().toISOString(),
  };
  await db.collection("status_checks").insertOne(doc);
  res.json(doc);
});

router.get("/status", async (req, res) => {
  const docs = await db
    .collection("status_checks")
    .find({}, { projection: { _id: 0 } })
    .limit(1000)
    .toArray();
  res.json(docs);
});

// ---- newsletter ---------------------------------------------------------
router.post("/newsletter", async (req, res) => {
  const raw = (req.body || {}).email;
  if (!raw || raw.length < 3 || raw.length > 320) {
    return res.status(400).json({ detail: "Please enter a valid email address." });
  }
  const email = raw.trim().toLowerCase();
  if (!email.includes("@") || !email.split("@").pop().includes(".")) {
    return res.status(400).json({ detail: "Please enter a valid email address." });
  }

  const existing = await db.collection("newsletter_subscribers").findOne({ email });
  if (existing) {
    return res.json({ message: "You are already on our list. Blessings!" });
  }

  const doc = {
    id: uuidv4(),
    email,
    subscribed_at: new Date().toISOString(),
  };
  await db.collection("newsletter_subscribers").insertOne(doc);

  fireAlert(
    "New Ashnee Newsletter Subscriber",
    alertHtml("New Newsletter Subscriber", [["Email", escapeHtml(email)]])
  );

  res.json({ message: "Welcome to the Ashnee family." });
});

router.get("/newsletter", async (req, res) => {
  const docs = await db
    .collection("newsletter_subscribers")
    .find({}, { projection: { _id: 0 } })
    .limit(1000)
    .toArray();
  res.json(docs);
});

// ---- contact --------------------------------------------------------------
router.post("/contact", async (req, res) => {
  const body = req.body || {};
  const name = (body.name || "").toString();
  const email = (body.email || "").toString();
  const phone = (body.phone || "").toString();
  const message = (body.message || "").toString();
  const productName = (body.productName || "").toString();
  const productImage = (body.productImage || "").toString();

  if (!name || name.length > 120) {
    return res.status(422).json({ detail: "A valid name is required." });
  }
  if (!email || email.length < 3 || email.length > 320) {
    return res.status(422).json({ detail: "A valid email is required." });
  }
  if (!message || message.length > 4000) {
    return res.status(422).json({ detail: "A message is required." });
  }

  const doc = {
    id: uuidv4(),
    name,
    email,
    phone,
    message,
    productName,
    productImage,
    sent_at: new Date().toISOString(),
  };
  await db.collection("contact_messages").insertOne(doc);

  const rows = [
    ["Name", escapeHtml(name)],
    ["Email", escapeHtml(email)],
    ["Phone", escapeHtml(phone) || "—"],
  ];
  if (productName) rows.push(["Product", escapeHtml(productName)]);
  rows.push(["Message", escapeHtml(message)]);

  fireAlert(
    `New Ashnee Enquiry from ${name}`,
    alertHtml("New Contact Enquiry", rows, productImage),
    email
  );

  res.json({ message: "Thank you for writing to us. We will respond within 24 hours." });
});

router.get("/contact", async (req, res) => {
  const docs = await db
    .collection("contact_messages")
    .find({}, { projection: { _id: 0 } })
    .limit(1000)
    .toArray();
  res.json(docs);
});

app.use("/api", router);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Ashnee API listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await mongoClient.close();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await mongoClient.close();
  process.exit(0);
});
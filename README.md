# Ashnee Jewellery — A Bond of Blessing

Luxury jewellery brand website. React 19 + Tailwind + FastAPI + MongoDB.

## Structure
```
ashnee-jewellery/
├── frontend/          React app (Home, Gold, Silver, About, Contact)
├── backend/           FastAPI app (newsletter + contact APIs, MongoDB + Resend email alerts)
├── design_guidelines.json   Design tokens (colors, fonts, spacing) used to build this site
└── README.md
```

## Prerequisites
- Node.js 18+ and Yarn
- Python 3.10+
- A MongoDB connection string (free tier: https://www.mongodb.com/cloud/atlas)
- (Optional) A Resend API key for email alerts: https://resend.com/api-keys

## Backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # then fill in your real MONGO_URL, etc.
uvicorn server:app --reload --port 8000
```
Backend runs at http://localhost:8000 — API endpoints under `/api`.

## Frontend setup
```bash
cd frontend
yarn install
```
Create `frontend/.env` with:
```
REACT_APP_BACKEND_URL=http://localhost:8000
```
Then:
```bash
yarn start
```
Frontend runs at http://localhost:3000

## What's still needed before real launch
- **Real product photography** — swap into `frontend/src/components/JewelFrame.jsx` usage (pass an `image` prop; falls back to elegant placeholder frame if omitted)
- **shadcn/ui components** — `frontend/src/components/ui/` (sonner, checkbox, slider, select) — standard shadcn primitives, not custom-built
- **Resend API key** — required for contact/newsletter email alerts to fire; forms still save to MongoDB without it
- Product detail pages, cart/checkout are marked P1/P2 in the original PRD backlog

## Notes
This project was originally built in Emergent (an AI app builder) and manually
reconstructed file-by-file for full ownership and portability. See
`design_guidelines.json` for the full design system reference (colors: maroon
#963E35, ivory #F6EDE2, gold #D4AF37, charcoal #2A1F1D).

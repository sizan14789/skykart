# ShopUp 🚀

**ShopUp** is a modern, full‑stack e‑commerce platform featuring a sleek storefront and a powerful admin dashboard for end‑to‑end product and order management. Built with cutting‑edge technologies and **raw SQL** for maximum control and performance.

---

## 🌐 Live Demo

- **Store:** [https://shopup-sizan.vercel.app](https://shopup-sizan.vercel.app)

> Note: Deployed on free-tier services. Initial load may take a few seconds.

---

## ✨ Features

### 🛍️ Modern Storefront

- Mobile‑first, fully responsive UI
- Product catalog with ratings & pricing
- Shopping cart & wishlist
- Search and filtering
- Secure user authentication (Login / Signup)

### 🧑‍💼 Admin Dashboard

- Product upload & management
- Inventory tracking (upcoming)
- Order management (upcoming)

### ⚡ Performance‑Focused

- Next.js App Router & Server Components
- Tailwind CSS for fast, scalable styling
- Zustand for lightweight state management
- **Raw SQL** queries (no ORM) for optimal DB performance

---

## 🛠 Tech Stack

**Frontend**

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Zustand

**Backend**

- Node.js
- Express.js
- Zod (validation)

**Database**

- Supabase (PostgreSQL)
- Raw SQL (no ORM)

**Deployment**

- Vercel (Next.js apps)
- Backend deployable to Render

---

## 📁 Project Structure (Monorepo)

```
shopup/
├── frontend/                     # Next.js frontend application
│   ├── app/
│   │   ├── (buyer)/              # Buyer-facing routes (store, cart, profile)
│   │   └── (seller)/             # Seller/Admin routes (dashboard, products, orders)
│   ├── assets/
│   ├── ui/                       # Reusable Tailwind UI components
│   ├── lib/                      # Utilities, helpers, API clients
│   ├── public/
│   ├── types/
│   ├── context/
│   ├── .env
│   ├── middleware.ts             # Next.js middleware
│   └── package.json
├── backend/                      # Express.js backend API
│   ├── routes/                   # API route definitions
│   ├── controllers/              # Request handlers / business logic
│   ├── schema/                   # Zod validation schemas
│   ├── middlewares/
│   ├── utils/
│   ├── .env
│   ├── app.js
│   ├── server.js
│   └── package.json
└── README.md                     # Project documentation

```

---

## 🚀 Quick Start

### Prerequisites

- Node.js **20+**
- Supabase account (PostgreSQL)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/sizan14789/shopup.git
cd shopup/frontend; npm i; cd ../backend; npm i
```

### 2️⃣ Environment Setup

Create `.env.local` in `frontend/`:

```env
BACKEND_URL='http://localhost:4000'
NEXT_PUBLIC_BACKEND_URL='http://localhost:4000'
```

Create `.env.local` in `backend/`:

```env
PORT=4000
ENV='dev'
FRONTEND_URL='http://localhost:3000'

SUPABASE_URL=<supabase server url> #'https://<url>.supabase.co'
SUPABASE_KEY=<service key>         #Don't use anon key

# PG_HOST=<database host name>
# PG_DATABASE=<database name>      #'postgres' usually
# PG_PORT=<database PORT>          #5432 usually
# PG_USER=<username>               #'postgres' usually
# PG_PASSWORD=<postgres password>
```

### 3️⃣ Development (Run from shopup folder)

```bash
# frontend
npm run frontend

# Backend API
npm run backend
```

## 🗄 Database Schema (Example)

Check frontend/types folder to understand schemas

---

## 🎨 Design System

- **Typography:** Poppins (Google Fonts)
- **Colors:** CSS custom properties (`--bg`, `--text`, `--primary`)
- **Components:** Fully reusable Tailwind components in `frontend/ui/`

---

## 📱 Responsive Design

- Mobile‑first layout
- Tailwind responsive utilities
- Hamburger navigation & mobile menu
- Touch‑friendly interactions

---

## 🌟 Key Architectural Decisions

- **No ORM:** Full control and maximum performance with raw SQL
- **Zustand:** Simple, fast state management
- **Next.js App Router:** Modern routing and layouts
- **Server Components:** Optimized rendering strategy
- **Monorepo:** Shared UI, types, and DB logic across apps

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/product-filter`)
3. Commit your changes (`git commit -m "Add product filtering"`)
4. Push to the branch (`git push origin feature/product-filter`)
5. Open a Pull Request

---

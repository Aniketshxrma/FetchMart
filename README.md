<div align="center">

# 🛍️ FetchMart — Fullstack E-Commerce Experience

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)

<p align="center">
  A state-of-the-art, lightning-fast fullstack e-commerce web platform engineered with modern React, Express.js, and MongoDB Atlas. Features real-time cart/wishlist sync, live order tracking, category filtering, coupon discounts, and resilient fallback architecture.
</p>

[✨ Live Demo](#-live-deployments) • [🚀 Features](#-key-features) • [🛠️ Tech Stack](#️-tech-stack) • [⚡ Quick Start](#-quick-start-guide) • [📡 API Reference](#-api-endpoints)

</div>

---

## 🌐 Live Deployments

- 🚀 **Live Web Store (Frontend):** [**https://fetch-mart-one.vercel.app**](https://fetch-mart-one.vercel.app)
- 📡 **Live API (Backend):** [**https://fetchmart-qvg7.onrender.com**](https://fetchmart-qvg7.onrender.com)
- 🍃 **Database:** MongoDB Atlas (AWS Cloud Cluster)

---

## ✨ Key Features

### 🛒 Modern Shopping Experience
- **Dynamic Product Catalog:** Multi-category catalog (Electronics, Fashion, Beauty, Home, Fitness) with instant filtering, sorting, and pagination.
- **Search Autocomplete:** Debounced real-time search with instant dropdown previews.
- **Product Detail Modal:** High-resolution product image gallery, stock status badges, specifications, customer ratings, and verified buyer reviews.
- **Interactive Cart Drawer:** Quantity increment/decrement, subtotal calculation, coupon discounts (`FETCH10`, `SUPER60`, `FREESHIP`), and checkout flow with celebratory confetti.
- **Wishlist Management:** One-click wishlist toggle synced directly to user accounts.

### 👤 User Account & Profile
- **Authentication & Profiles:** User registration, instant login, profile editing, and avatar customization.
- **Address Book:** Add, edit, remove, and switch default shipping addresses.
- **Order History:** Complete history of previous orders with delivery statuses.

### 📦 Live Order Tracking
- Real-time tracking system with timeline progression (Placed $\rightarrow$ Packed $\rightarrow$ In Transit $\rightarrow$ Delivered).
- Interactive order lookups by tracking ID (e.g. `FM104928`).

### 🛡️ Resilient Dual-Layer Backend
- **MongoDB Atlas Integration:** Fully persistent schemas using Mongoose models for products, users, orders, and newsletters.
- **Zero-Downtime Fallback:** Seamless in-memory fallback mode ensures 100% uptime even during network or database maintenance.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite 8
- **Icons:** Lucide React
- **Animations & Effects:** CSS Glassmorphism, Micro-interactions, Canvas Confetti
- **State Management:** React Context API (`AuthContext`, `CartContext`, `WishlistContext`, `ToastContext`)

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js 4
- **Database ORM:** Mongoose 8 (MongoDB Atlas)
- **Logging & Security:** Morgan, CORS, Dotenv

---

## 📁 Project Structure

```text
FetchMart/
├── client/                     # Frontend React application (Vite)
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── components/         # UI Components (Navbar, Modals, Cart, etc.)
│   │   ├── context/            # Auth, Cart, Wishlist, Toast Contexts
│   │   ├── config/             # Dynamic API URL routing
│   │   ├── data/               # Seed product datasets
│   │   ├── services/           # Backend API integration services
│   │   ├── App.jsx             # Main Application Component
│   │   ├── index.css           # Global design system & theme tokens
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API (Node + Express)
│   ├── config/                 # MongoDB Atlas connection & auto-seed
│   ├── data/                   # Seed fallback data
│   ├── models/                 # Mongoose Models (User, Product, Order, etc.)
│   ├── routes/                 # Express API routes
│   ├── scripts/                # Database seed scripts
│   ├── server.js               # Express application entry
│   ├── package.json
│   └── .env.example            # Environment variables template
│
├── .gitignore                  # Root gitignore protecting .env & node_modules
├── package.json                # Root helper scripts
└── README.md                   # Project documentation
```

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- [MongoDB Atlas Account](https://www.mongodb.com/atlas) (Free tier)

### 1. Clone the Repository
```bash
git clone https://github.com/Aniketshxrma/FetchMart.git
cd FetchMart
```

### 2. Install Dependencies
```bash
# Install root, client, and server dependencies
npm run install:all
```

### 3. Setup Environment Variables
Create a `.env` file in the `server` directory:
```bash
# server/.env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 4. Seed Database (Optional)
```bash
npm run seed
```

### 5. Run Locally (Concurrent Development)
In two separate terminals:

**Terminal 1 — Backend:**
```bash
npm run server
# Server running at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
npm run client
# Client running at http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Status & Available Endpoints |
| `GET` | `/api/health` | Health Check & Database Status |
| `GET` | `/api/products` | Fetch product catalog with filtering & search |
| `GET` | `/api/products/:id` | Get single product details |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user |
| `GET` | `/api/auth/profile/:id` | Get user profile & addresses |
| `POST` | `/api/auth/sync-cart/:id` | Sync user cart to cloud |
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/orders/track/:id` | Track order by tracking ID |
| `POST` | `/api/contact` | Submit contact / support inquiry |
| `POST` | `/api/newsletter` | Subscribe to newsletter |

---

## 🚀 Deployment Guide

### Deploy Backend to Render
1. Create a **New Web Service** on [Render](https://render.com/).
2. Select your GitHub repository.
3. Set **Root Directory** to `server`.
4. Add Environment Variable:
   - `MONGODB_URI` = `your_mongodb_atlas_connection_string`
5. Click **Deploy Web Service**.

### Deploy Frontend to Vercel
1. Import repository on [Vercel](https://vercel.com/).
2. Set **Root Directory** to `client`.
3. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com`
4. Click **Deploy**.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">
  Crafted with ❤️ by <a href="https://github.com/Aniketshxrma">Aniket Sharma</a>
</div>

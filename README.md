# 🌍 Online Donation Platform

A full-stack donation management system where users can discover charity campaigns and donate, admins can review submissions and track donations, and charities can submit new campaigns. Built with **Next.js**, **React**, **Node.js**, **Express**, **MongoDB**, and **TypeScript**.

---

## ⚙️ Tech Stack

### 💻 Frontend
- **Next.js 14 (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **Zustand** for state management

### 🖥️ Backend
- **Node.js**
- **Express.js**
- **TypeScript**
- **Mongoose** (MongoDB ODM)

### 🔒 Authentication
- **JWT-based Auth** (Register/Login)
- **Role-based Access Control** (User / Admin)

---

## ✨ Features

### 👥 General Users
- Register / Login with JWT
- View approved donation campaigns
- Donate to campaigns with a progress bar
- View personal donation history
- Receive thank-you alerts after donating

### 🧑‍💼 Admin Panel
- Approve / delete pending campaigns
- View all donations in a sortable table
- View per-campaign donation stats
- Admin-only protected routes

### 🏢 Charities / Public
- Submit new campaign without logging in
- Admin reviews and approves the campaign

---

## 📂 Folder Structure

project-root/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.ts
├── frontend/
│ ├── app/
│ │ ├── auth/
│ │ ├── campaign/
│ │ ├── admin/
│ │ └── layout.tsx
│ ├── components/
│ ├── styles/
│ ├── types/
│ └── utils/
├── .env
├── package.json
└── README.md

yaml
Copy
Edit

---

## 🧪 Sample Users

### 👤 Regular User
Email: user@example.com
Password: password123

shell
Copy
Edit

### 🛠️ Admin User
Email: admin@example.com
Password: admin123

yaml
Copy
Edit

---

## 🛠️ Getting Started

### 1. 🔧 Backend Setup

```bash
cd backend
npm install
Create a .env file in /backend:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/donation-platform
JWT_SECRET=your_secret_key
Run the backend server:

bash
Copy
Edit
npm run dev
2. 💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
Create a .env.local file in /frontend:

env
Copy
Edit
NEXT_PUBLIC_API_URL=http://localhost:5000/api
Run the frontend app:

bash
Copy
Edit
npm run dev

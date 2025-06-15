# CharitySync
### A full-stack online donation platform where users can discover charity campaigns and donate, admins can review submissions and track donations, and charities can submit new campaigns.
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

## 🛠️ Getting Started

### 1. 🔧 Backend Setup

```bash
cd backend
npm install
```
Create a .env file in backend:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/donation-platform
JWT_SECRET=your_secret_key
```
Start the backend server:

```bash
npm run dev
```

### 2. 💻 Frontend Setup

```bash
cd frontend
npm install
```

Create a .env.local file in frontend:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```


---

This project is licensed under the MIT License.


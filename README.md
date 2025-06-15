#  CharitySync

A **full-stack online donation platform** where users can explore campaigns and contribute, admins can manage donations and campaigns, and charities can submit new campaigns without registering.

---

##  Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)

---

##  Introduction

**CharitySync** is a modern donation platform that connects generous users with causes that need support. Built with a robust tech stack, the platform enables:
- Users to browse and donate to campaigns
- Admins to manage donations and submissions
- Charities to publicly submit campaigns without needing an account

Whether you're a donor, campaign manager, or admin, CharitySync provides a smooth, intuitive experience.

---

##  Tech Stack

###  Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Zustand (for state management)

###  Backend
- Node.js
- Express.js
- TypeScript
- Mongoose (MongoDB ODM)

###  Authentication
- JWT-based Auth (Login/Register)
- Role-based Access Control (User/Admin)

---

##  Features

###  General Users
- Register and log in securely
- View and donate to live campaigns
- View personal donation history
- See donation progress bars and get thank-you alerts

###  Admin Panel
- Approve or delete campaigns submitted by charities
- View all donations in a sortable, filterable table
- View statistics for each campaign's donations
- Access protected admin-only routes

###  Charities / Public
- Submit campaigns via a public form (no login required)
- Await approval from admin before going live

---

##  Installation

### 1.  Backend Setup

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

### 2.  Frontend Setup

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



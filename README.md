# 🏨 Hotel Management System

A full-stack **Hotel Management System** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.
This system helps hotels streamline operations like **room booking, check-in/check-out, billing, housekeeping, and maintenance** with **role-based dashboards** for Admin, Manager, Receptionist, Housekeeping, and Guests.

---

## ✨ Features

* 🔐 **Authentication & Role-based Access** (Admin, Staff, Guests)
* 🏨 **Room Management** (inventory, availability, pricing, status updates)
* 📅 **Reservation System** (online & staff bookings, check-in/check-out flow)
* 💳 **Billing & Invoicing** (auto-generated with breakdown of charges)
* 🧹 **Housekeeping & Maintenance** (task scheduling, reporting issues)
* 📊 **Reports & Analytics** (occupancy rates, revenue, guest feedback)
* 📱 **Responsive UI** (works on desktop & mobile)

---

## 🛠️ Tech Stack

**Frontend:**

* React
* React Router
* Axios
* TailwindCSS / Material-UI

**Backend:**

* Node.js
* Express.js
* MongoDB (Mongoose ORM)

**Authentication:**

* JWT (JSON Web Token)
* bcrypt.js (password hashing)

---

## 📂 Project Structure

```
Hotel-Management-System/
│
├── backend/               # Express + MongoDB backend
│   ├── models/            # Database models (User, Room, Reservation, Invoice)
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth & role-based middleware
│   └── server.js          # Entry point
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Pages (Login, Dashboard, Rooms, Reservations)
│   │   ├── context/       # State management (Context API/Redux)
│   │   └── App.js
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/tahamahmood004/Hotel-Management-System.git
cd Hotel-Management-System
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4️⃣ Environment Variables

Create a `.env` file in the **backend/** directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## 🚀 Usage

1. Register/Login with role-based access (Admin, Receptionist, Guest).
2. Admin can add/manage rooms, users, and policies.
3. Receptionist can manage reservations and check-in/check-out.
4. Housekeeping staff updates room cleaning status.
5. Guests can make bookings and provide feedback.

---

## 📸 Screenshots (Add Later)

> *You can add screenshots of your app UI here after frontend is done.*

---

## 📊 Future Improvements

* Online payment gateway integration 💳
* Multi-language support 🌍
* AI-powered demand forecasting 🤖
* Mobile app version 📱

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature-branch`)
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** – you are free to use, modify, and distribute it.

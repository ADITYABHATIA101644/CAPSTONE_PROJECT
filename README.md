# 🎟️ Event Booking & Reservation System (MERN Stack)

A full-stack **Event Booking & Reservation System** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
This project supports **role-based authentication (Admin & User)**, event management, booking system, and a modern UI.

---

## 🌐 Live Demo
👉https://booking-app-a4jc.onrender.com/

---

## 📌 Features

### 👤 User Features
- Register & Login authentication
- View all available events
- Filter events by date
- View upcoming & past events
- Book event with payment simulation 💳
- Cancel bookings
- View personal bookings

---

### 🛠️ Admin Features
- Admin login access
- Add new events
- Delete events
- Manage event details (date, time, seats, price)

---

### ⚙️ General Features
- JWT Authentication 🔐
- REST API integration
- MongoDB Atlas database ☁️
- Responsive modern UI
- Single deployment (frontend + backend)
- Live hosted on Render

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM
- CSS (Custom UI)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt.js

### Deployment
- Render (Single Service Deployment)
- MongoDB Atlas

---

## 📁 Project Structure

booking-system/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.js
│ │ └── App.css
│ ├── package.json
│ └── build/
│
├── .gitignore
└── README.md


---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
bash
git clone https://github.com/your-username/your-repo-name.git
cd booking-system

---

## 2️⃣ Setup Backend

cd backend
npm install

.env:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@gmail.com

Run backend:

npm run dev

## 3️⃣ Setup Frontend

cd frontend
npm install
npm start

## 🌍 Deployment (Render)

Build Command:

cd frontend && npm install && npm run build && cd ../backend && npm install

Start Command:

cd backend && node server.js

## 💳 Payment Feature

Currently uses:

Simulated Payment System (for demo purposes)

Future scope:

Razorpay / Stripe integration

## 📈 Future Improvements

Real Payment Gateway Integration
Email Notifications 📧
Admin Dashboard Analytics 📊
Event Image Upload
Seat Selection UI
Mobile App Version

## 🎯 Learning Outcomes

Full MERN stack development
REST API design
Authentication & authorization
Deployment on cloud (Render)
Real-world project architecture

## 👨‍💻 Author

Aditya Bhatia

GitHub: https://github.com/ADITYABHATIA101644/CAPSTONE_PROJECT
Project: CAPSTONE PROJECT

## ⭐ Acknowledgements

MongoDB Atlas
Render
React Documentation
Node.js Community


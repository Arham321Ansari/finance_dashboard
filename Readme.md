# 💰 Finance Dashboard (Role-Based MERN App)

A full-stack financial management system built using the MERN stack with role-based access control, JWT authentication, and real-time analytics.

---

## 🚀 Features

* 🔐 JWT Authentication (Login/Register)
* 👥 Role-Based Access Control

  * **Admin**: Full access (Create, Update, Delete)
  * **Analyst**: View analytics
  * **Viewer**: Read-only access
* 📊 Dashboard Analytics (MongoDB Aggregation)

  * Total Income
  * Total Expense
  * Net Balance
  * Monthly Trends
* 🧾 Record Management (CRUD)
* ⚡ Real-time UI updates
* 🌐 RESTful API design

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Axios
* Vite

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB (Mongoose)

**Authentication**

* JSON Web Token (JWT)

---

## 📂 Project Structure

/client → React frontend
/server → Node.js backend

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔑 API Endpoints

### Auth Routes

* POST `/api/auth/register` → Register user
* POST `/api/auth/login` → Login user

---

### Record Routes

* POST `/api/records` → Create record (Admin)
* GET `/api/records` → Get records (Admin, Analyst)
* PUT `/api/records/:id` → Update record (Admin)
* DELETE `/api/records/:id` → Delete record (Admin)

---

### Dashboard Routes

* GET `/api/dashboard/summary` → Income/Expense summary
* GET `/api/dashboard/recent` → Recent transactions
* GET `/api/dashboard/category` → Category-wise data
* GET `/api/dashboard/monthly` → Monthly trends

---

## 🔐 Authentication Flow

* User logs in → receives JWT token
* Token stored in localStorage
* Token sent in headers for protected routes:

```bash
Authorization: Bearer <token>
```

---

## 📊 Aggregation Logic

Used MongoDB aggregation pipelines:

* `$match` → Filter user-specific data
* `$group` → Calculate totals
* `$sum` → Compute income/expense
* `$sort` → Monthly trends

---

## ⚠️ Assumptions

* Each record belongs to a single user
* Role is assigned at registration
* Only Admin can modify data
* Dates are stored in ISO format

---

## ⚖️ Trade-offs

* Used localStorage for token (simpler, but less secure than httpOnly cookies)
* Basic UI (focus on backend logic)
* No pagination implemented (can be added for scalability)

---

## 🚀 Future Improvements

* 📊 Add charts (Chart.js)
* 📄 Pagination & filtering
* 🔐 Refresh token mechanism
* 📱 Mobile responsiveness
* 🌍 Deploy to cloud (Render / Vercel)

---

## 🧠 Learnings

* Implemented role-based authorization
* Built secure REST APIs
* Learned MongoDB aggregation deeply
* Improved frontend-backend integration

---

## 📬 Contact

Feel free to connect with me on LinkedIn or reach out for collaboration!

---

⭐ If you like this project, give it a star!

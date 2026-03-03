# 🏨 HostelHub – Student Hostel Booking Platform

HostelHub is a full-stack web application that allows students to search, compare, and book hostels online from anywhere. 
The platform provides a secure and convenient way to explore hostels, check availability, and make bookings without physical visits.

---



---

## 📌 Features

### 👨‍🎓 Student Features
- User Registration & Login
- Search hostels by location
- View hostel details (price, facilities, images)
- Check room availability
- Online booking system
- Booking history

### 🏢 Admin Features
- Add new hostels
- Update hostel details
- Delete hostels
- Manage bookings
- Dashboard overview

---

## 🛠️ Tech Stack

### Frontend
-React js
-Tailwind CSS
- JavaScript


### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Token)

### Tools & Platforms
- Git & GitHub
- Postman (API testing)
- VS Code
- Render / Vercel (Deployment)

---

## 📂 Project Structure

```
HostelHub/
│
├── client/               # Frontend source code
├── server/               # Backend source code
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   └── middleware/       # Authentication middleware
│
├── .env
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository


### 2️⃣ Install Dependencies

Backend:
```
cd server
npm install
```

Frontend:
```
cd client
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside server folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Application

Backend:
```
npm start
```

Frontend:
```
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/register | Register User |
| POST | /api/login | Login User |
| GET | /api/hostels | Get all hostels |
| GET | /api/hostels/:id | Get hostel by ID |
| POST | /api/book | Book a hostel |
| GET | /api/bookings | Get user bookings |

---

## 🔐 Security Features

- Password hashing
- JWT authentication
- Protected routes
- Input validation

---

## 📸 Screenshots

(Add project screenshots here)

---

## 🔮 Future Improvements

- Online payment integration
- Google Maps integration
- Reviews & Ratings system
- Hostel owner dashboard
- Email notifications

---

## 🎯 Project Objective

To simplify hostel searching and booking process for students by providing a centralized and secure online platform.

---

## 👨‍💻 Author

Sudhanshu Kumar  
B.Tech – Electronics & Communication Engineering  
Aspiring Full Stack Developer  

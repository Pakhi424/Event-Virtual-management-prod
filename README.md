A production-ready backend system for managing virtual events with secure authentication, event creation, and participant registration.

Live Demo: https://event-virtual-management-prod3.onrender.com

---

## 📌 Features

- User Registration & Login (JWT Authentication)
- Password hashing using bcrypt
- Role-based access (Organizer / Attendee)
- Create, Update, Delete Events
- Register for Events
- Participant Management
- MongoDB Database Integration
- Fully deployed on Render

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Render (Deployment)

---

## 📂 Project Structure

src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js

---

## 🔐 Authentication

Authentication is handled using JWT tokens.

After login, include the token in request headers:

---

## 📡 API Endpoints

### 🔑 Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

---

### 📅 Event Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/events | Create event (Organizer only) |
| GET | /api/events | Get all events |
| PUT | /api/events/:id | Update event |
| DELETE | /api/events/:id | Delete event |
| POST | /api/events/:id/register | Register for event |

---

## ⚙️ Environment Variables

Create a .env file in root:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

---

## 🧪 Running Locally

```bash
npm install
npm run dev 

🚀 Deployment

Deployed using Render.

Steps:
	1.	Push code to GitHub
	2.	Connect repo to Render
	3.	Add environment variables
	4.	Deploy

⸻

👩‍💻 Author

Pakhi Mishra
Backend Developer | Node.js | MongoDB | JWT | System Design

⸻

⭐ Future Improvements
	•	Email notifications on event registration
	•	Pagination
	•	Event filtering
	•	Rate limiting
	•	Logging middleware
	•	Docker support

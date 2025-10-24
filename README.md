# 🧾 FormApp

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Express-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Status](https://img.shields.io/badge/status-Active-success)

> **FormApp** is a full-stack web application for creating, managing, and analyzing dynamic forms.  
> Built with **React + TailwindCSS** on the frontend and **Express + PostgreSQL** on the backend, it provides a clean and efficient environment for form building, response tracking, and user authentication.

---

## 🚀 Tech Stack

**Frontend:**
- ⚛️ React 19 (Vite)
- 🎨 TailwindCSS
- 🧩 dnd-kit (drag and drop)
- 📦 Axios
- 🧭 React Router DOM
- 🖼️ lucide-react icons

**Backend:**
- 🧠 Node.js + Express
- 🗄️ PostgreSQL
- 🔐 JWT authentication
- 🧂 dotenv + helmet + rate limiting
- 🧰 Multer for file uploads
- 🧹 Jest + Supertest for testing

---

## ✨ Features

- 🧩 **Dynamic form creation and editing**
- 👥 **User authentication** with JWT
- 📊 **Response collection and analytics**
- 📁 **File upload support**
- 🧠 **Role-based access control**
- ⚡ **Modern, responsive UI** (TailwindCSS + lucide-react)
- 🧮 **Excel export (xlsx)** support
- 🐳 **Docker-ready** setup for full-stack deployment

---

## 🏗️ Project Structure

form-app/
├── backend/ # Express API (Node.js + PostgreSQL)
├── frontend/ # React + Vite client
├── .env # Global environment variables
├── docker-compose.yml
└── .gitignore


---

## ⚙️ Environment Variables

### 🖥️ Backend `.env`
DB_NAME=formapp
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
VITE_API_URL=http://localhost:3001/api
JWT_SECRET=mySuperSecretKey123


### 🌐 Frontend `.env`
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=FormApp
VITE_APP_VERSION=1.0.0
VITE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PWA=false

---

## 🧩 Installation & Setup

### 🔹 Backend
```bash
cd backend
npm install
npm run dev
Backend runs on http://localhost:3001 by default.

🔹 Frontend
bash
Копирај кȏд
cd frontend
npm install
npm run dev
Frontend runs on http://localhost:5173 (Vite default).

🐳 Using Docker (optional)
A docker-compose.yml file is included for easy containerized setup.

bash
Копирај кȏд
docker-compose up --build
This will start:

PostgreSQL database

Backend API

Frontend (React)

🧠 Scripts
Backend
Command	Description
npm run dev	Start server with Nodemon
npm start	Run production server
npm test	Run Jest tests
npm run test:watch	Run tests in watch mode
npm run test:coverage	Generate test coverage report

Frontend
Command	Description
npm run dev	Start Vite dev server
npm run build	Build for production
npm run preview	Preview built app
npm run lint	Run ESLint

🔐 Authentication
FormApp uses JWT (JSON Web Tokens) for authentication:

POST /api/auth/register — create new user

POST /api/auth/login — authenticate and receive token

Protected routes require the Authorization: Bearer <token> header.

💾 Database
PostgreSQL is used for persistence.

Make sure the credentials in .env match your local setup.

Tables are created automatically at app startup (or via migration scripts if configured).


🧰 Future Improvements
✅ Add analytics dashboard

📈 Enable PWA mode

🌍 Deploy with Docker Compose + Nginx




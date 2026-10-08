# 📄 Resume Reality Check

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-react?style=for-the-badge&logo=react)

An intelligent, full-stack web application designed to help job seekers evaluate their resumes against ATS (Applicant Tracking System) criteria, identify formatting red flags, and receive actionable feedback before applying.

---

## 🔗 Live Demo & Links

- **Live Application:** [https://resume-reality-check-dusky.vercel.app](https://resume-reality-check-dusky.vercel.app)
- **Frontend Repository:** [https://github.com/Anchal-Gola/Resume-Reality-Check](https://github.com/Anchal-Gola/Resume-Reality-Check)

---

## ✨ Key Features

- **Automated Resume Parsing & ATS Analysis:** Extracts text, key skills, and contact details to generate an ATS compatibility score with formatting feedback.
- **Job Explorer Module:** Lets users search and explore career roles and relevant technical domains.
- **Job Matcher:** Compares uploaded resume content directly against target job descriptions to calculate match readiness.
- **Resume History Tracking:** Saves previous resume analysis logs so users can track improvements over time.
- **Authentication & User Dashboard:** Secure user sessions with personalized dashboard metrics (resume score, total uploads, and recent submissions).
- **Modern Responsive UI:** Clean, intuitive dashboard interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ORM)
- **File Handling:** Multer

---

## 📐 System Architecture
┌─────────────────┐       HTTP Requests       ┌─────────────────┐
│   React Client  │ ────────────────────────> │  Express Server │
│   (Vercel SPA)  │ <──────────────────────── │   (Node.js API) │
└─────────────────┘      JSON Responses       └────────┬────────┘
│
│ Mongoose
▼
┌─────────────────┐
│  MongoDB Atlas  │
│   (Cloud DB)    │
└─────────────────┘
---

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory and add the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=[https://resume-reality-check-dusky.vercel.app](https://resume-reality-check-dusky.vercel.app)

🚀 Local Setup & Installation
Prerequisites
 . Node.js installed (v18+)

 . MongoDB Atlas account or local MongoDB instance


Step 1: Clone Repository
 git clone [https://github.com/Anchal-Gola/Resume-Reality-Check.git](https://github.com/Anchal-Gola/Resume-Reality-Check.git)
  cd Resume-Reality-Check

Step 2: Backend Setup
cd server
npm install
npm run dev

Step 3: Frontend Setup
cd ../client
npm install
npm run dev

## 📞 Contact & Portfolio

  Developer: Anchal Gola
  GitHub: [@Anchal-Gola](https://github.com/Anchal-Gola)
  LinkedIn: [Anchal Gola](https://www.linkedin.com/in/anchal-gola)
  Email: [anchalspg2005@gmail.com](mailto:anchalspg2005@gmail.com)


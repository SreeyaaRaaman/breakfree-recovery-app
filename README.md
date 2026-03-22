# 💙 BreakFree - Addiction Recovery Tracker

A modern web app that helps users overcome addiction by tracking daily habits and saving real money they would otherwise spend on addictive substances, with a real money locking and withdrawal system.

## 🚀 Built With
* Frontend: React.js, Tailwind CSS v4, Framer Motion, Chart.js
* Backend: Node.js, Express.js
* Database: Local SQLite (Sequelize ORM)
* Auth: JWT & bcrypt
* Payment: Razorpay

## 📂 Project Structure

```text
C:\Breakfree\
├── frontend\        # React Frontend (Vite)
│   ├── src\         # React Source Code
│   │   ├── components\
│   │   ├── pages\
│   │   └── context\
├── backend\         # Node.js/Express Backend
│   ├── models\      # SQLite Schemas (Sequelize)
│   ├── routes\      # API Routes
│   ├── controllers\ # Request Handlers
│   ├── middleware\  # JWT protection
│   └── server.js    # Entry Point
```

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js installed
- Razorpay account created (Test Mode is completely FREE)

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Start the backend server:
```bash
npm run dev
# or: node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173/`.

### ⚡ Available Features Let's Test:
- User Authentication (Login / Register) with encrypted passwords.
- Real-time Goal setting and tracking.
- Saving daily money with **Razorpay Checkout Integration**.
- Progress tracking with Interactive Chart.js graphs.
- Withdrawable funds locker that enforces streaks and goals.
- Inspirational Health Facts & Craving AI support page.

## ✅ Deployment Ready
- **Frontend** is ready for **Vercel** (`npm run build`).
- **Backend** is completely ready for **Render / Heroku** (Just map environment variables).
- Make sure to update the `http://localhost:5000` URLs in the frontend code using process.env or Vite's `.env.production` URLs before deploying!

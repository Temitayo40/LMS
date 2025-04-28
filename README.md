# Learning Management System (LMS) | MERN Stack

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Server-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb)
![Stripe](https://img.shields.io/badge/Payments-Stripe-6772e5?logo=stripe)
![Clerk](https://img.shields.io/badge/Auth-Clerk-5436DA?logo=clerk)
![Git](https://img.shields.io/badge/VersionControl-Git-orange?logo=git)

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=vercel)](https://lms-frontend-lovat-rho.vercel.app/)

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [License](#-license)

---

## ✨ Features

- Secure course enrollment and payment with **Stripe** integration.
- Course preview functionality before enrollment.
- User authentication and access control with **Clerk**.
- Real-time progress tracking with dynamic progress bars.
- Course rating and review system.
- Responsive and mobile-friendly UI with **Tailwind CSS**.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Clerk
- **Payments:** Stripe
- **Version Control:** Git, GitHub

---

## 📸 Screenshots

> Make sure you save your screenshots in a `screenshots` folder!

### 🏠 Home Page
![Home Page](./screenshots/home.png)

### 🎥 Course Preview
![Course Preview](./screenshots/preview.png)

### 💳 Checkout (Stripe Payment)
![Checkout Page](./screenshots/checkout.png)


---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- MongoDB database (local or cloud)
- Stripe account for payment processing
- Clerk account for authentication

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Navigate into the project directory
cd your-repo-name

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run the application
npm run dev

# 📝 MERN Stack Blog Platform

A **full-featured blogging application** built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. Users can create, edit, and delete blog posts, register and log in, and read articles from others.

## 🌐 Live Demo

[**Live Website**](https://blog-und6.onrender.com/) – Explore the blog, read posts, and try out the features.

## ✨ Features

✅ User Authentication (JWT-based)
✅ Create, Read, Update, Delete (CRUD) blog posts
✅ Rich text editing with image support
✅ Responsive design
✅ Author-specific dashboard
✅ Protected routes and session management
✅ MongoDB for flexible post storage
✅ RESTful API with error handling

---

## 🛠️ Tech Stack

### 🧠 Backend

* **Node.js** + **Express.js**
* **MongoDB** + **Mongoose**
* **JWT Authentication**
* **bcrypt** for password hashing

### 🎨 Frontend

* **React.js**
* **Tailwind CSS** or CSS Modules
* **Axios** for API requests
* **React Router** for page navigation
* **React Hook Form** or Formik for handling forms
* **Lexical** for rich text editor

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](https://github.com/user-attachments/assets/7f904a5b-fbd7-494f-bbb6-da510433fb7c)

### 📝 Blog Editor
![Editor](https://github.com/user-attachments/assets/4459b287-d43f-4f7f-b025-b62ce36a1e34)

### 🔐 Login
![Login](https://github.com/user-attachments/assets/e942303d-53bd-4d9c-bcbe-6d32db644ad0)

---

## 🧪 Getting Started

### Prerequisites

* Node.js and npm/yarn installed
* MongoDB running locally or MongoDB Atlas URL

---

## ⚙️ Installation

### 1. Clone the repository

```bash
https://github.com/rahat728/blog.git
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
```

Start backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ./client
npm install
```

Create a `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:5000
```

Start frontend server:

```bash
npm run dev
```

---

## 📁 Folder Structure

```plaintext
blog/
├── backend/
│   ├── models/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
├── .env
└── README.md
```

---

## 🔐 Authentication

* Users are authenticated using **JWT tokens**
* Protected routes on both client and server
* Tokens stored in HTTP-only cookies

---

## 🚀 Deployment

### Frontend:

* Render

### Backend:

* Render

---

## 🙋‍♂️ Author

* **Name:** Asifuzzaman Rahat
* **Email:** [asifuzzamanrahat728@gmail.com](mailto:asifuzzamanrahat728@gmail.com)
* **LinkedIn:** [mdrahat728](https://www.linkedin.com/in/mdrahat728)
* **GitHub:** [github](https://github.com/rahat728)

---

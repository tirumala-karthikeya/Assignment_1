# Online Quiz Platform

## 🚀 Project Overview

This is an **Online Quiz Platform** built using React.js and TypeScript. The application allows users to create, take, and score quizzes. It includes authentication, a timer for answering questions, and result analysis.

## 🛠 Tech Stack

- **Frontend:** React.js, TypeScript, Redux, Bootstrap 5
- **Backend:** Node.js, Express, MongoDB (if applicable)
- **State Management:** Redux Toolkit

## 🔥 Features

✅ User authentication (Login/Register)
✅ Quiz creation with time limits
✅ Practice mode to attempt quizzes
✅ Timer for each question
✅ Score display with correct and incorrect answers
✅ Responsive design
✅ Redux for state management

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/quiz-platform.git
cd quiz-platform
```

### 2️⃣ Install Dependencies

```sh
npm install  # or yarn install
```

### 3️⃣ Start the Development Server

```sh
npm run dev  # Starts React development server
```

### 4️⃣ Run the Backend

```sh
cd backend
npm install
npm start  # Starts Node.js server
```

### 5️⃣ Open the Application

Visit `http://localhost:3000` in your browser.

## 🏆 Backend Setup

### Assignment_1

## Description

This project is a Node.js-based authentication system using Express, MongoDB, and JWT. It includes user authentication features such as registration, login, and password reset functionality.

## Features

- User Registration
- User Login with JWT Authentication
- Password Reset via Token
- MongoDB Database Connection

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Token)
- Bcrypt for Password Hashing
- Dotenv for Environment Variables

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/tirumala-karthikeya/Assignment_1.git
   cd Assignment_1
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. Start the server:

   ```sh
   npm start
   ```

   Or with Nodemon:

   ```sh
   npm run dev
   ```

## API Endpoints

### User Authentication

#### Register User

- **Endpoint:** `POST /api/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```

  ![User Registration](backend/screenshots/register.png)

#### Login User

- **Endpoint:** `POST /api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
![User Login](backend/screenshots/login.png)

#### Password Reset Request

- **Endpoint:** `POST /api/auth/reset-password-request`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "email": "johndoe@example.com"
  }
  ```
![Password Reset](backend/screenshots/reset-password.png)

#### Reset Password

- **Endpoint:** `POST /api/auth/reset-password`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "token": "your_reset_token",
    "newPassword": "newsecurepassword"
  }
  ```



Made with ❤️ by **J Tirumala Karthikeya**


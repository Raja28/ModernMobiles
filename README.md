<!-- # 🛍️ E-Commerce React App

Welcome to **Modern Mobiles**! This is an e-commerce web application built using **React JS**  **ReduxToolkit** and **Bootstrap**. The goal of this project is to create a scalable and responsive online shopping platform, This app allows users to browse and filter products by **category** and **ratings**. Users can also **add items to the cart** and **wishlist** for future purchases.

---

## 🧰 Tech Stack

- **React JS**
- **ReduxToolkit**
- **Bootstrap**
- **VS Code** 

---

## 🚀 Features

### 🏠 Home Page
- A landing page with a list of featured categories.
- Clicking on a category redirects the user to the product listing page filtered by that category.

### 🛒 Product Listing Page
- Displays a list of all products.
- Includes a filter section with:
  - **Category Filter:** Checkboxes for available categories.
  - **Ratings Filter:** Slider to filter products by minimum rating.
- Clear filters functionality to reset all filters.

--- -->


# 🛍️ Modern Mobiles

Welcome to **Modern Mobiles**! This is a full-stack e-commerce web application built using **React JS**, **Bootstrap**, **ReduxToolkit** and integrated with **Razorpay** for payments. The app also features **OTP-based email authentication** for a secure and modern login experience.

---

## 📦 Project Overview

This app allows users to:
- Browse and filter products by **category** and **rating**
- Add items to **Cart** and **Wishlist**
- **Register and log in** using a **secure OTP system sent via email**
- **Make payments** using **Razorpay**

---

## Demo Link
Visit the website: [ModernMobiles](https://modern-mobiles.vercel.app/)

## Demo Video
Watch the short video (5 mins): [Loom Video](https://www.loom.com/share/704f6558ec294d14936c3a08c6e7c0a5?sid=6fb5a8ef-a03a-4fa8-8b1c-33a6766d5c2d)

---

## 🧰 Tech Stack

- **Frontend:** React JS
- **State Managment:** Redux Toolkit
- **UI Framework:** Bootstrap
- **Authentication:** OTP-based login via Email
- **Payments:** Razorpay Integration
- **Dev Environment:** VS Code

---

## 🚀 Features

### 🏠 Home Page
- Landing page with featured categories
- Clicking a category takes the user to the filtered Product Listing Page

### 📄 Product Listing Page
- Full product list with filters
- **Filter by:**
  - ✅ Category 
  - ⭐ Rating 
  - ↕️ Sorting 
  - 💰 Price Range 

### 🔐 OTP-Based Email Authentication
- Users can **sign up** or **log in** using just their email
- An **OTP is sent to the user’s email** for verification
- Once verified, the user is logged in securely
- Enhances security and simplifies user onboarding

### 💳 Razorpay Payment Integration
- Complete cart checkout using **Razorpay’s secure payment gateway**
- Supports multiple payment methods (cards, UPI, wallets, etc.)
- Payment confirmation and success/failure handling

---

## 📝 Quick Start
To run the app locally we need backend part and can get from the repo [SERVER](https://github.com/Raja28/ModernMobiles-Server.git) and must add required data like PORT, MONGODB_URL ...

### SERVER
```
git clone: https://github.com/Raja28/ModernMobiles-Server.git
npm install
npm run dev
```

### CLIENT
Clone the repo with given line below and create env file add VITE_RAZORPAY_KEY and REACT_APP_RAZORPAY_SECRET

```
git clone: https://github.com/Raja28/ModernMobiles.git
npm install
npm run dev
```



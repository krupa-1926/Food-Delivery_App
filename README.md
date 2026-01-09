# 🚚 Food Ordering Web App (MERN Stack)

## ✨ Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Contact](#contact)

##  Introduction
This is a full-stack food ordering web application built using the MERN stack (MongoDB, Express, React, Node.js). The application consists of a customer-facing app for ordering food and an admin app for managing orders, menu items, and more.

##  Features
- User authentication and authorization
- Browse food items
- Add items to the cart and place orders
- Razorpay Payment Integration: Secure and reliable payment processing using Razorpay.
- Order tracking
- Admin panel to manage menu items, orders

##  Technologies Used
- **Frontend:** React.js, React Context API, React Router
- **Backend:** Node.js, Express.js
- **Payment Gateway:** Razorpay
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS

## Installation
### Prerequisites
- Node.js
- MongoDB

## 🚀 Run Locally — Step-by-step

Make sure you have Node.js (v20+ recommended) and npm installed.

### Clone the Repository
```sh
git clone https://github.com/krupa-1926/Food-Delivery_App.git
cd Food-Delivery_App
```

## Backend Setup
Navigate to the backend directory:

```sh
cd backend

```
Install dependencies:

```sh
npm install
```

Create a .env file in the backend directory and add the following:

```sh
JWT_SECRET = "random#secret"
RAZORPAY_KEY_ID="Add your razorpay key"
RAZORPAY_KEY_SECRET="add your razorpay secret"
⚠️ Note: Do not commit your .env file. Create your own keys from razorpay Dashboard and use them locally.

```
 
Start the backend server:

```sh
npm run server
```
## Frontend Setup
Navigate to the frontend directory:

```sh

cd frontend
```

Install dependencies:
```sh

npm install
```

Start the frontend server:
```sh

npm run dev
```

## Admin App Setup

Navigate to the admin directory:
```sh

cd admin
```

Install dependencies:

```sh
npm install
```

Start the admin app :
```sh
npm run dev
```

## Usage
Access the customer-facing app at http://localhost:5173.
Access the admin app at http://localhost:5174.
Register as a new user or log in with existing credentials.
Browse the menu, add items to the cart, and place an order.
Pay using dummy visa card
Use the admin panel to manage orders, menu items.

##  Screenshots
# 🏠 Home : 
<img width='100%' src='./Screenshots/hero.jfif' />

# 🔐 Login : 
<img width='100%' src='./Screenshots/login.jfif' />

# 🔐 Signup : 
<img width='100%' src='./Screenshots/signup.jfif' />

# 🍔 Menu :
<img width='100%' src='./Screenshots/menu.jfif' />

# 🍱 Menu Food :
<img width='100%' src='./Screenshots/menu food.jfif' />

# ℹ️ App Download : 
<img width='100%' src='./Screenshots/app download.jfif' />

# 🍱 Menu Food :
<img width='100%' src='./Screenshots/menu food 1.jfif' />

# 🛒 Cart : 
<img width='100%' src='./Screenshots/cart.jfif' />

# 📞 Contact :
<img width='100%' src='./Screenshots/contact.jfif' />

# ❤️ Payment :
<img width='100%' src='./Screenshots/payment.jfikof' />


##  API Documentation
The API endpoints for the backend can be documented using tools like Postman or Swagger. Include endpoints for user authentication, menu items, orders, and more.

##  Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include relevant tests.


##  Contact
For any questions or suggestions, feel free to contact me.

Happy coding!

Feel free to customize this template according to your specific project details and requirements.



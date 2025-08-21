# 🌍 Wanderlust Web Project Installation Guide

This guide will walk you through the installation process for the **Wanderlust** web project.  
Follow the steps below to set up the project locally on your machine.

---

## ✅ Prerequisites
Before you begin, ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (version **18** recommended)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Nodemon](https://www.npmjs.com/package/nodemon) (installed globally)

---

## ⚡ Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/Harshitha-2210/wanderlust.git
cd Major Project
---
### 2. Set Up the Database
Create a `.env` file in the root directory and add:
```env
ATLASDB_URL=mongodb://127.0.0.1:27017/wanderlust
---
### 3. Configure Cloudinary

Sign up for a free account at Cloudinary
.

Obtain your CLOUD_NAME, CLOUD_API_KEY, and CLOUD_API_SECRET.

Add them to your .env file:

CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
---
### 4. Add Application Secret

In the same .env file, add a secure secret:

SECRET=your_cloudinary_secret

---
### 5. Install Dependencies

Run the following command to install all required packages:

npm install

---

### 6. Run the Application

Start the application using Nodemon:

nodemon app.js
---

🚀 Access the Project

Once the server is running, open your browser and visit:

👉 http://localhost:8080

🎉 You’re All Set!

You have successfully installed and set up the Wanderlust web project on your local machine.


✨ Happy traveling with Wanderlust! ✈️

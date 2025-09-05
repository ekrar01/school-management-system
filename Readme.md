School Management System
A modern, responsive web application for managing school information built with Next.js and MySQL. This application allows users to add schools with detailed information and view them in a clean, card-based layout.

🌐 Live Demo
View Live Application • GitHub Repository

🚀 Features
Add Schools: Comprehensive form with validation to add new schools

View Schools: Grid layout displaying schools with images and details

Image Upload: Store school images with proper file validation

Responsive Design: Works perfectly on desktop, tablet, and mobile devices

Form Validation: Comprehensive client and server-side validation

Modern UI: Clean, spacious interface with smooth animations

🛠️ Tech Stack
Frontend Framework: Next.js 13+ with React 18

Database: MySQL with mysql2 driver

Form Handling: React Hook Form with validation

File Uploads: Multer for image processing

HTTP Client: Axios for API requests

Styling: CSS Modules with custom properties

Deployment: Vercel for seamless hosting

📋 Prerequisites
Before running this application, ensure you have:

Node.js 16.8 or later

MySQL database (local or cloud)

npm or yarn package manager

🏗️ Project Structure
text
school-management-system/
├── components/
│   ├── Layout/
│   │   └── Header.jsx
│   ├── SchoolForm/
│   │   └── index.jsx
│   └── SchoolCard/
│       └── index.jsx
├── pages/
│   ├── api/
│   │   ├── schools/
│   │   │   ├── add.js
│   │   │   └── index.js
│   │   └── upload.js
│   ├── add-school.jsx
│   ├── schools.jsx
│   └── _app.jsx
├── public/
│   ├── school-images/
│   └── school-placeholder.jpg
├── styles/
│   ├── globals.css
│   ├── Header.module.css
│   ├── SchoolForm.module.css
│   └── SchoolCard.module.css
├── lib/
│   └── db.js
├── utils/
│   └── validation.js
├── config/
│   └── constants.js
├── package.json
├── next.config.js
└── .env.local
🚀 Installation & Setup
Clone the repository

bash
git clone https://github.com/your-username/school-management-system.git
cd school-management-system
Install dependencies

bash
npm install
Set up environment variables
Create a .env.local file in the root directory:

env
MYSQL_HOST=your_mysql_host
MYSQL_DATABASE=school_db
MYSQL_USER=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
Set up the database

sql
CREATE DATABASE school_db;

USE school_db;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact BIGINT NOT NULL,
    image TEXT,
    email_id TEXT NOT NULL
);
Run the development server

bash
npm run dev
Open your browser
Navigate to http://localhost:3000

📖 Usage
Adding a School
Navigate to the "Add School" page

Fill out the form with school details:

School Name (required)

Address (required)

City (required)

State (required)

Contact Number (required, minimum 10 digits)

Email Address (required, valid email format)

School Image (optional)

Click "Add School" to submit the form

Viewing Schools
Navigate to the "View Schools" page

Browse all schools in a responsive grid layout

Each card displays:

School Name

Address

City

Image (or placeholder if none uploaded)

🎨 UI/UX Features
Clean Design: Minimalist interface with ample white space

Responsive Grid: Adaptive layout that works on all screen sizes

Smooth Animations: Subtle transitions and hover effects

Accessible Forms: Proper labeling and error messaging

Visual Feedback: Loading states and success/error notifications

🔧 API Endpoints
GET /api/schools - Fetch all schools

POST /api/schools/add - Add a new school with image upload

File uploads are handled with Multer and stored in /public/school-images/

🚀 Deployment
Deploy to Vercel
Push your code to GitHub

Connect your GitHub repository to Vercel

Add environment variables in Vercel dashboard

Deploy automatically with each push to main branch

Environment Variables for Production
Ensure these are set in your deployment platform:

text
MYSQL_HOST=your_production_mysql_host
MYSQL_DATABASE=your_production_database
MYSQL_USER=your_production_username
MYSQL_PASSWORD=your_production_password
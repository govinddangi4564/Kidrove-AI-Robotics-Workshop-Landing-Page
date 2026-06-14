# Kidrove AI & Robotics Workshop Landing Page

A production-ready, highly interactive, and visually stunning workshop landing page inspired by kidrove.com. Built for an ed-tech brand targeting parents of children aged 8–14.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Vite + React.js** (Functional components, hooks)
- **TypeScript** (Strong typing, interfaces)
- **Tailwind CSS v4** (Utility-first styling, CSS `@theme` variables)
- **Lucide React** (Modern, clean icon set)
- **Intersection Observer** (Subtle scroll-triggered fade-in animations)

### Backend (Server)
- **Node.js + Express.js**
- **MongoDB & Mongoose** (With an automatic **In-Memory fallback** if MongoDB is unavailable)
- **CORS Enabled**
- **express-validator** (Server-side payload schema validation)
- **dotenv** (Environment configuration)

---

## 🚀 Key Features
1. **Responsive Glassmorphism Navbar**: Sticky header with transition effects on scroll and responsive mobile drawer.
2. **Interactive Hero Section**: Includes an amber urgency badge, two action CTAs, and a **real-time live countdown timer** ticking down to the start date (15 July 2026).
3. **Smart Share Option**: Triggers the native browser Web Share API (or copies the URL to the clipboard with visual checkmark feedback).
4. **Detailed Layout Cards**: Asymmetric cards that break down age group, fees, schedules, and mode of learning.
5. **Interactive FAQ Accordion**: Expandable Q&A items using smooth max-height and icon rotation transitions.
6. **Registration Form**: Client-side form validation, submit loading spinner states, inline errors, and a success banner upon submission.
7. **Robust DB Fallback**: Server connection automatically checks for MongoDB connection. If it fails or is unconfigured, it logs a warning and stores records in a memory array, guaranteeing zero runtime downtime during demo testing.

---

## 📂 Project Structure

```text
/client            → React frontend (Vite + TS + Tailwind)
  ├── src/
  │   ├── assets/        → Custom generated assets & illustrations
  │   ├── components/    → Modular UI Components (Navbar, Hero, FAQ, etc.)
  │   ├── constants/     → Hardcoded workshop constants
  │   ├── App.tsx        → Layout assembly & scroll animation handlers
  │   ├── index.css      → Global CSS imports, keyframes, and theme configuration
  │   └── main.tsx       → React DOM entry point
  ├── index.html         → Page template with SEO meta description
  └── .env               → Frontend environment variables
/server            → Express backend (Node.js)
  ├── src/
  │   ├── config/        → DB config (MongoDB & in-memory fallbacks)
  │   ├── models/        → Mongoose schema definitions
  │   └── server.js      → Entry server with endpoints and express-validators
  └── .env               → Backend environment variables
README.md          → Project documentation
```

---

## ⚙️ Environment Variables

### Frontend (`/client/.env`)
Create a `.env` file inside the `/client` directory:
```env
VITE_API_URL=http://localhost:5000
```

### Backend (`/server/.env`)
Create a `.env` file inside the `/server` directory:
```env
PORT=5000

# Add your MongoDB connection string (e.g., mongodb://localhost:27017/kidrove)
# If left empty, the server will automatically default to In-Memory storage mode
MONGODB_URI=
```

---

## 🏃 Local Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Step 1: Start the Backend Server
1. Open a terminal and navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server in development mode (using nodemon):
   ```bash
   npm run dev
   ```
   *The server will start on port `5000` (or your customized `PORT` env).*

### Step 2: Start the Frontend Client
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:5173](http://localhost:5173) in your browser.*

## 📡 API Documentation

### 1. Health Check
*   **URL:** `/api/health`
*   **Method:** `GET`
*   **Description:** Get server connection status and current database storage mode.
*   **Response (200 OK):**
    ```json
    {
      "status": "healthy",
      "storageMode": "mongodb" // or "in-memory"
    }
    ```

### 2. Submit Enquiry
*   **URL:** `/api/enquiry`
*   **Method:** `POST`
*   **Headers:** `Content-Type: application/json`
*   **Body:**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "9876543210"
    }
    ```
*   **Validation Rules:**
    *   `name`: String, required, minimum length 2.
    *   `email`: String, required, must be a valid email format.
    *   `phone`: String, required, exactly 10 digits, numeric only, must match standard Indian mobile numbers (starts with 6-9).
*   **Success Response (201 Created):**
    ```json
    {
      "success": true,
      "message": "Enquiry received successfully",
      "data": {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "9876543210"
      }
    }
    ```
*   **Validation Error Response (400 Bad Request):**
    ```json
    {
      "success": false,
      "errors": [
        {
          "field": "phone",
          "message": "Invalid Indian mobile number (must start with 6-9)"
        }
      ]
    }
    ```

---

## 📝 Submission Note

I approached this assignment by breaking the UI into reusable React components — Navbar, Hero, WorkshopDetails, LearningOutcomes, FAQ, RegistrationForm, and Footer — each responsible for a single section. I used Tailwind CSS for responsive styling and React Hook Form for client-side validation with real-time feedback. The Express backend uses express-validator for field-level validation and returns structured error responses. MongoDB stores enquiries via Mongoose with a timestamped schema. Given more time, I would integrate Razorpay for fee collection, add an admin dashboard to manage registrations, send confirmation emails via Nodemailer, and write unit tests for the API using Jest and Supertest.


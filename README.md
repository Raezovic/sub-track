# Subscription Tracker API

A production-ready RESTful API designed to manage user subscriptions, coordinate automated renewal email notifications, and secure requests against bots and abuse. Built on a modern Node.js, Express, and MongoDB backend.

---

## 🚀 Key Features

*   **User Authentication & Security:** Secure registration and login using JWT (`jsonwebtoken`), password hashing via `bcryptjs`, and mongoose database transactions to maintain consistency during user signup.
*   **Subscription Management:** Complete management for tracking subscriptions, including price, currency, frequency (daily, weekly, monthly, yearly), categories (sports, entertainment, lifestyle, etc.), payment methods, and automated renewal date calculations.
*   **Automated Email Workflows:** Powered by **Upstash Workflow** (via QStash) to schedule, delay, and resume multi-step subscription email alerts. It automatically sends reminder notifications 7, 5, 2, and 1 days before a subscription's renewal date.
*   **Advanced Web Protection:** Integrated with **Arcjet** security to provide:
    *   **Rate Limiting:** Token Bucket algorithm preventing brute-force attacks.
    *   **Bot Detection:** Blocking malicious automated scrapers/bots.
    *   **WAF Shield:** Protecting endpoints from common web vulnerabilities (e.g., SQL injections).
*   **Emailing System:** NodeMailer integration utilizing styled dynamic HTML templates to dispatch custom notification alerts.
*   **Centralized Error Handling:** Global middleware implementation for consistent HTTP error formats and cleaner debug logging.

---

## 🛠️ Technology Stack

| Category | Technology Used |
| :--- | :--- |
| **Runtime & Framework** | Node.js (ES Modules), Express.js |
| **Database & ODM** | MongoDB, Mongoose |
| **Workflow & Queueing** | Upstash Workflow (QStash) |
| **Security & Rate Limit** | Arcjet Node SDK |
| **Auth & Encryption** | JSON Web Tokens (JWT), BcryptJS |
| **Date & Time** | DayJS |
| **Email Delivery** | Nodemailer |

---

## 📂 Project Architecture

```
SUB-TRACKER/
├── config/             # Environment, Arcjet, and Nodemailer configs
├── controllers/        # Business logic for auth, subscriptions, users, and workflows
├── database/           # MongoDB database connection helper
├── middlewares/        # Authentication, Arcjet, and global error handling
├── models/             # Mongoose schemas for User and Subscription
├── routes/             # Express routes grouping endpoints logically
├── utils/              # Email dispatcher utilities and HTML templates
├── app.js              # Server configuration and middleware registration
└── package.json        # Project metadata and dependencies
```

---

## 🔌 API Endpoints

### Authentication
*   `POST /api/v1/auth/sign-up` - Create a new user account
*   `POST /api/v1/auth/sign-in` - Log into an existing account
*   `POST /api/v1/auth/sign-out` - Clear session/token

### Users
*   `GET /api/v1/users` - Retrieve all users
*   `GET /api/v1/users/:id` - Fetch details for a specific user (Authorized)

### Subscriptions
*   `GET /api/v1/subscriptions` - Get subscriptions list
*   `GET /api/v1/subscriptions/:id` - Get specific subscription detail
*   `POST /api/v1/subscriptions` - Create new subscription (Authorized)
*   `PUT /api/v1/subscriptions/:id` - Update subscription details
*   `DELETE /api/v1/subscriptions/:id` - Remove subscription
*   `GET /api/v1/subscriptions/user/:id` - Get all subscriptions belonging to a user (Authorized)
*   `PUT /api/v1/subscriptions/:id/cancel` - Cancel active subscription
*   `GET /api/v1/subscriptions/upcoming-renewals` - Get subscriptions renewing soon

### Workflows
*   `POST /api/v1/workflows/subscription/reminder` - Upstash Workflow execution endpoint (handles reminder schedules and email dispatches)

---

## ⚙️ Configuration & Run

### Environment Variables
Configure the following in your `.env.development.local` or `.env.production.local` file:
*   `PORT` - Server port (e.g. 5500)
*   `SERVER_URL` - Server host URL for workflow callbacks (e.g., http://localhost:5500)
*   `DB_URI` - MongoDB connection string
*   `JWT_SECRET` & `JWT_EXPIRES_IN` - Keys used for signing authentication tokens
*   `ARCJET_KEY` & `ARCJET_ENV` - Credentials for bot and rate limit protection
*   `QSTASH_TOKEN` & `QSTASH_URL` - Credentials for Upstash workflows execution
*   `EMAIL_PASSWORD` - SMTP email password for Nodemailer notifications

### Scripts
To run the server locally:
```bash
# Start server in production mode
npm start

# Start server in development mode (with nodemon)
npm run dev
```

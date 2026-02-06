# Expense Tracker API - Technical Documentation

Welcome to the Expense Tracker Technical Documentation. This document provides a comprehensive overview of the application's architecture, functionality, and API endpoints.

---

## 🏗 Architecture & Technologies

- **Framework**: [NestJS](https://nestjs.com/) (Node.js framework)
- **Database**: MySQL
- **ORM**: [Sequelize](https://sequelize.org/) (via `@nestjs/sequelize`)
- **Validation**: Joi (via `joi-validation.pipe.ts`)
- **Security**:
  - JWT Authentication
  - Bcrypt for Password Hashing
  - Throttler for Rate Limiting
- **Logging**: Morgan

---

## 🔒 Authentication

Most endpoints (except Login & Register) are protected by a **JWT Auth Guard**. To access protected routes, you must provide a valid JWT in the `Authorization` header:
`Authorization: Bearer <your_jwt_token>`

---

## 📁 Modules & Functionality

### 1. Users & Auth
- **Path**: `/auth`, `/users`
- **Features**: User registration, login with JWT issuance, and profile retrieval.
- **Key Files**: `auth.controller.ts`, `users.controller.ts`, `user.model.ts`

### 2. Income Management
- **Path**: `/income`
- **Features**: CRUD operations for tracking income sources.
- **Fields**: `source`, `amount`, `date`, `description`.
- **Key Files**: `income.controller.ts`, `income.model.ts`

### 3. Expense Tracking
- **Path**: `/expense`
- **Features**: Record expenditures and categorize them.
- **Fields**: `amount`, `date`, `description`, `categoryId`.
- **Key Files**: `expense.controller.ts`, `expense.model.ts`

### 4. Categories
- **Path**: `/categories`
- **Features**: Manage expense categories (e.g., Food, Travel, Rent).
- **Fields**: `name`, `icon`, `description`.
- **Key Files**: `categories.controller.ts`, `expense-category.model.ts`

### 5. Reminders
- **Path**: `/reminders`
- **Features**: Set reminders for upcoming payments or expenses.
- **Fields**: `title`, `amount`, `reminderDate`, `reminderTime`, `isCompleted`.
- **Key Files**: `reminders.controller.ts`, `reminder.model.ts`

### 6. Reports
- **Path**: `/reports`
- **Features**: Generate monthly reports summarizing total income, total expenses, and daily breakdown.
- **Key Files**: `reports.controller.ts`, `reports.service.ts`

---

## 🚀 API Reference

### Auth
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/auth/login` | User login | No |
| POST | `/users/register` | Create a new user | No |

### Income
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/income` | Get all incomes | Yes |
| POST | `/income` | Create income | Yes |
| PATCH | `/income/:id` | Update income | Yes |
| DELETE | `/income/:id` | Delete income | Yes |

### Expense
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/expense` | Get all expenses | Yes |
| POST | `/expense` | Create expense | Yes |
| PUT | `/expense` | Update expense | Yes |
| DELETE | `/expense/:id` | Delete expense | Yes |

### Categories
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/categories` | Get all categories | Yes |
| POST | `/categories` | Create category | Yes |

### Reminders
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/reminders` | Get all reminders | Yes |
| POST | `/reminders` | Create reminder | Yes |

### Reports
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/reports/monthly` | Get monthly report | Yes |

---

## 🛠 Prerequisites & Setup

### Environment Variables (.env)
Ensure your `.env` file contains the following keys:
- `DB_HOST`: Database host
- `DB_PORT`: Database port (default 3306)
- `DB_USERNAME`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: Secret key for JWT signing

### Running Locally
1. `npm install`
2. `npm run start:dev`

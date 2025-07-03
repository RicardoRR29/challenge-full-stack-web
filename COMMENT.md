# COMMENTS.md

## 🧠 Architecture Decisions

The system was developed with a layered architecture and modern technologies to ensure security, maintainability, and scalability:

- **Backend (Node.js + Express + Prisma)**  
  The backend uses a clean separation between routes, controllers, and services, following best practices for RESTful APIs.  
  Prisma ORM was chosen for its performance, type safety, and ease of migrations.  
  Authentication and authorization were implemented using JWT. The system supports role-based access control with two roles: `admin` and `user`.

- **Frontend (Vue.js + Vuetify)**  
  The frontend was built with Vue 3 and Vuetify, focusing on clarity and usability.  
  Axios was used for communicating with the backend, and form validation was implemented using Vuetify’s built-in rules and vee-validate.  
  The system includes views for listing, creating, editing, and deleting students, with protected access based on authentication.

---

## 🧩 Third-Party Libraries Used

### Backend

- `@prisma/client` — ORM and DB migrations
- `express` — Web server framework
- `jsonwebtoken` — JWT-based authentication and role validation
- `bcrypt` — Password hashing
- `dotenv` — Environment variable management
- `cors`, `helmet` — Security best practices
- `jest`, `supertest` — Testing libraries for backend

### Frontend

- `vue` — Reactive frontend framework
- `vuetify` — Material Design UI library
- `axios` — HTTP client
- `vee-validate`, `yup` — Validation handling for forms

---

## ✅ Delivered Highlights

- **JWT authentication** with secure password hashing (`bcrypt`)
- **Role-based authorization** with support for `admin` and `user` roles
- Complete CRUD implementation for Students (create, list, update, delete)
- Proper form validation and error handling
- Modular backend with separation of concerns (routes, services, controllers)
- Backend tests for authentication and student operations using Jest and Supertest
- Frontend integrated with protected routes and form state control
- Clear environment variable management via `.env` and Prisma configuration

---

## 🚀 What I Would Improve with More Time

If given more time, I would focus on:

1. **Responsive Design**  
   Improve the responsiveness of the frontend layout to ensure better usability across mobile and tablet devices.

2. **Confirmation Modal for Deletion**  
   Add a modal dialog to confirm deletion of a student, enhancing UX and preventing accidental actions.

3. **Git Commit History**  
   Refactor Git history to follow Conventional Commits or Gitmoji style, and improve branch management with Git Flow.

4. **Reusable Component Abstractions**  
   Abstract student form and table components to increase reusability and simplify future module expansion.

5. **Test Isolation**  
   Separate the testing environment by configuring a dedicated `.env.test` file and using a distinct test database.

6. **Production Deployment**  
   Prepare the project for cloud deployment using services like Render (backend) and Vercel (frontend), with `.env` setup and environment-specific builds.

---

Thank you for reviewing my project! I'm open to feedback and excited to keep growing as a full stack developer.

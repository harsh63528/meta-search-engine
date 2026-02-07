# Meta Search Engine - Server API Routes Documentation

This document provides a comprehensive guide to all the API routes available in the Meta Search Engine server.

---

## Base Router Structure

The main router file (`src/routes/index.js`) serves as the central hub that consolidates all sub-routers:

```javascript
router.use("/auth", authRoutes);
router.use("/search", searchRoutes);
router.use("/history", historyRoutes);
```

---

## 1. Authentication Routes (`/auth`)

**File:** `src/routes/auth.routes.js`  
**Base Path:** `/auth`

### Endpoints:

| Method | Endpoint              | Called Function      | Middleware                                 | Description                          |
| ------ | --------------------- | -------------------- | ------------------------------------------ | ------------------------------------ |
| POST   | `/auth/register`      | `registerUser`       | -                                          | User registration endpoint           |
| POST   | `/auth/login`         | `loginUser`          | -                                          | User login endpoint                  |
| POST   | `/auth/logout`        | `logoutUser`         | -                                          | User logout endpoint                 |
| PUT    | `/auth/profile-image` | `updateProfileImage` | `authMiddleware`, `upload.single("image")` | Upload/update user profile image     |
| GET    | `/auth/me`            | `GetProfile`         | `authMiddleware`                           | Get current user profile information |

**Controller:** `src/controllers/auth.controller.js`

---

## 2. Search Routes (`/search`)

**File:** `src/routes/search.routes.js`  
**Base Path:** `/search`

### Endpoints:

| Method | Endpoint   | Called Function    | Middleware | Description                                             |
| ------ | ---------- | ------------------ | ---------- | ------------------------------------------------------- |
| GET    | `/search/` | `searchController` | -          | Perform a search query (supports multiple search types) |

**Controller:** `src/controllers/search.Controller.js`

---

## 3. History Routes (`/history`)

**File:** `src/routes/history.routes.js`  
**Base Path:** `/history`

### Endpoints:

| Method | Endpoint         | Called Function        | Middleware       | Description                          |
| ------ | ---------------- | ---------------------- | ---------------- | ------------------------------------ |
| GET    | `/history/`      | `historyController`    | -                | Retrieve search history for the user |
| POST   | `/history/click` | `trackClickController` | `authMiddleware` | Track user click on search results   |

**Controller:** `src/controllers/history.controller.js`

---

## Complete API Endpoint Summary

All available endpoints in the application:

```
Base URL: http://localhost:[PORT]/api

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
PUT    /api/auth/profile-image
GET    /api/auth/me

GET    /api/search/
POST   /api/history/click
GET    /api/history/
```

---

## Middleware Used

- **authMiddleware** - Validates user authentication token
- **upload.single("image")** - Handles single image file upload for profile pictures

---

## Notes

- Authentication-required endpoints are marked with `authMiddleware`
- Search functionality supports various search types (defined in `src/constants/searchType.js`)
- Profile image uploads require multipart/form-data format
- History tracking automatically saves user search history and click interactions

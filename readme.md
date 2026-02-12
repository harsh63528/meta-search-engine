# Meta Search Engine

A modern meta search engine that aggregates search results from multiple sources. Users can search for images, videos, web pages, and articles while maintaining a personal search history.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Overview](#project-overview)
3. [System Architecture](#system-architecture)
4. [Setup Instructions](#setup-instructions)
5. [Project Structure](#project-structure)
6. [API Documentation](#api-documentation)
7. [Key Features & Algorithms](#key-features--algorithms)
8. [Future Improvements](#future-improvements)

---

## Technology Stack

### Frontend

- **React 19** - UI library for building interactive components
- **Vite** - Lightning-fast build tool and dev server
- **React Router 7** - Client-side routing for navigation
- **Axios** - HTTP client for API requests
- **Tailwind CSS + DaisyUI** - Utility-first CSS and component library

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for storing user data and search history
- **JWT (JSON Web Tokens)** - Secure authentication mechanism
- **Cloudinary** - Cloud storage for profile images
- **Multer** - Middleware for handling file uploads
- **bcryptjs** - Password hashing library

---

## Project Overview

Meta Search Engine is a full-stack web application that allows users to:

- **Search Content** - Query multiple search types (web, images, videos, articles)
- **User Authentication** - Register, login, and maintain user profiles
- **Search History** - Track and view previous searches
- **Click Tracking** - Record which search results users click on
- **Profile Management** - Upload and manage profile images

---

## System Architecture

### Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React + Vite)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Pages: Home, Search, Login, Register, Profile, History│  │
│  │ Components: Navbar, SearchBar, Cards, Tabs           │   │
│  │ Context: AuthContext, SearchContext                  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ Axios (HTTP Requests)
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                 Backend (Express.js API)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Routes: /auth, /search, /history                     │   │
│  │ Controllers: Handle business logic                   │   │
│  │ Services: Search aggregation, database operations    │   │
│  │ Middleware: Auth, Error handling, File upload        │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
    [MongoDB]    [Cloudinary]    [Search APIs]
    (User Data)  (Profile Pics)   (Dummy Services,pexels for image)
```

---

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB Atlas account (for database)
- Cloudinary account (for image uploads)

### Backend Setup

1. **Navigate to server directory**

```bash
cd server
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file** with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STAGE=development
PEXELS_API_KEY=your_pexels_api_key
```

4. **Start the server**

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**

```bash
cd client
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

The application will open at `http://localhost:5173`

---

## Project Structure

### Backend Structure

```
server/
├── src/
│   ├── config/              # Configuration files
│   │   ├── db.js           # MongoDB connection
│   │   └── cloudinary.js   # Cloudinary setup
│   ├── controllers/        # Request handlers
│   │   ├── auth.controller.js
│   │   ├── search.controller.js
│   │   └── history.controller.js
│   ├── middleware/         # Express middleware
│   │   ├── auth.middleware.js      # JWT verification
│   │   ├── error.middleware.js     # Error handling
│   │   └── upload.middleware.js    # File upload handling
│   ├── models/            # MongoDB schemas
│   │   ├── user.model.js
│   │   └── searchHistory.model.js
│   ├── routes/            # API endpoints
│   │   ├── auth.routes.js
│   │   ├── search.routes.js
│   │   ├── history.routes.js
│   │   └── index.js       # Main router
│   ├── services/          # Business logic
│   │   ├── search.service.js
│   │   ├── image.service.js
│   │   ├── video.service.js
│   │   ├── web.service.js
│   │   └── article.service.js
│   ├── utils/             # Helper functions
│   │   ├── asyncHandler.js
│   │   ├── formatResponse.js
│   │   └── removeDuplicates.js
│   ├── validators/        # Input validation
│   │   ├── auth.validator.js
│   │   └── search.validator.js
│   ├── app.js            # Express app setup
│   └── server.js         # Server entry point
├── package.json
└── .env
```

**Explanation:**

- **config/** - Database and third-party service configurations
- **controllers/** - Handle incoming requests and send responses
- **middleware/** - Process requests before they reach controllers
- **models/** - Define database schema structure
- **routes/** - Define API endpoints
- **services/** - Core business logic separated from controllers
- **utils/** - Reusable helper functions
- **validators/** - Input validation with `validateRegister()`, `validateLogin()`, `validateSearch()`, `validateClickTrack()`

### Frontend Structure

```
client/
├── src/
│   ├── api/
│   │   ├── axiosInstance.js
│   │   ├── auth.api.js
│   │   ├── search.api.js
│   │   └── history.api.js
│
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.jsx
│   │   ├── search/
│   │   │   ├── SearchBar.jsx
│   │   │   └── SearchTabs.jsx
│   │   ├── results/
│   │   │   ├── WebCard.jsx
│   │   │   ├── ImageCard.jsx
│   │   │   ├── VideoCard.jsx
│   │   │   └── ArticleCard.jsx
│   │   └── history/
│   │       ├── HistoryCard.jsx
│   │       ├── HistoryList.jsx
│   │       └── ClearHistoryModal.jsx
│
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── SearchContext.jsx
│
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useSearch.js
│
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── History.jsx
│   │   └── Results.jsx
│
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css

```

**Explanation:**

- **API/** - Centralized API communication layer
- **components/** - Modular, reusable UI components
- **context/** - Global state management (Authentication, Search)
- **hooks/** - Custom hooks for context access
- **pages/** - Full-page components
- **utils/** - Helper functions like route protection

---

## API Documentation

### Authentication Routes (`/api/auth`)

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/register`      | Create new user account     |
| POST   | `/login`         | User login with credentials |
| POST   | `/logout`        | Clear user session          |
| GET    | `/me`            | Get current user profile    |
| PUT    | `/profile-image` | Upload/update profile image |

### Search Routes (`/api/search`)

| Method | Endpoint | Description                              |
| ------ | -------- | ---------------------------------------- |
| GET    | `/`      | Search across all types or specific type |

**Query Parameters:**

- `q` (required) - Search query string
- `type` (optional) - Search type: "web", "image", "video", "article", or "all"

### History Routes (`/api/history`)

| Method | Endpoint | Description                        |
| ------ | -------- | ---------------------------------- |
| GET    | `/`      | Retrieve user's search history     |
| POST   | `/click` | Track user click on search results |
| delete | `/clear` | delete the whole history of user   |

---

## Key Features & Algorithms

### 1. JWT Authentication

- **How it works:** User credentials are validated and a JSON Web Token is issued
- **Flow:** Login → Server generates token → Token stored in cookies → Used for protected routes
- **Security:** Tokens expire in 7 days, stored as httpOnly cookies

### 2. Password Security

- Passwords are hashed using **bcryptjs** before storage
- Each password hash includes a salt for added security
- Passwords are never stored in plain text

### 3. Search Aggregation

- Combines results from multiple search services (web, images, videos, articles)
- Each service can query different APIs
- Removes duplicate results using URL comparison

### 4. Click Tracking

- Records user interactions with search results
- Stores: result title, URL, type, and timestamp
- Helps understand user search patterns

### 5. Search History Management

- Automatically saves searches with query, type, and result count
- Displays last 20 searches for users
- Associates searches with user IDs for personalization

### 6. Profile Image Upload

- Users can upload profile pictures
- Images stored on Cloudinary (cloud storage)
- Associated with user profile for display

---

## Data Models

### User Schema

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Search History Schema

```javascript
{
  user: ObjectId (reference to User),
  query: String,
  type: String (image|video|web|article|all),
  totalResults: Number,
  clicks: [
    {
      title: String,
      url: String,
      type: String,
      clickedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## User Flow

1. **User Registration/Login**
   - User submits credentials
   - Server validates and creates JWT token
   - Token stored in cookies for future requests

2. **Search Process**
   - User enters search query
   - Frontend sends request to `/api/search`
   - Server aggregates results from multiple services
   - Results displayed as cards (web, image, etc.)
   - Search automatically saved to history

3. **Click Tracking**
   - When user clicks a result link
   - Frontend sends click data to `/api/history/click`
   - Server records interaction
   - Data stored in search history

4. **Profile Management**
   - User can view profile information
   - Can upload profile image
   - Image stored on Cloudinary

---

## Future Improvements

1. **Real API Integration** - Connect to actual search engines (Google, Bing, etc.)
2. **Advanced Analytics** - Dashboard showing search trends
3. **Search Filters** - Filter results by date, relevance, etc.
4. **Saved Searches** - Users can save favorite search queries
5. **Dark Mode** - Theme toggle for user comfort
6. **Mobile Optimization** - Responsive design improvements
7. **Rate Limiting** - Prevent abuse of API endpoints
8. **Caching** - Improve search performance with result caching
9. **TypeScript** - Add type safety to the codebase

---

## Notes

- The project uses a layered architecture separating controllers, services, and models
- All sensitive data (API keys, secrets) should be stored in `.env` file
- MongoDB connection string must be obtained from MongoDB Atlas
- Cloudinary credentials are required for image upload functionality

---

## Contributing

When making changes to either frontend or backend:

1. Follow the existing code structure
2. Keep components and functions small and focused
3. Add meaningful comments for complex logic
4. Test changes before committing

---

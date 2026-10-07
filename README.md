# 📝 Blog Post API

A complete **RESTful Blog Post API** built using **Node.js, Express.js, MongoDB, and Mongoose**.

This project was built as the third backend project after completing the **Todo API** and **Expense Tracker API**. It focuses on real-world backend concepts such as authentication, authorization, CRUD operations, relationships, comments, likes, pagination, filtering, sorting, aggregation, validation, and centralized error handling.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration
- User login
- Password hashing using `bcrypt`
- JWT-based authentication
- Protected routes
- Bearer token authentication
- User role handling
- Owner-based authorization
- Authentication middleware

### 👤 User Management
- Create user accounts
- Secure password storage
- Login using email and password
- JWT token generation
- User information associated with posts and comments

### 📰 Blog Posts
- Create posts
- Get all posts
- Get a single post
- Update posts
- Delete posts
- Associate posts with their authors
- Populate author information
- Sort posts
- Search posts
- Filter posts by category
- Pagination

### 💬 Comments
- Add comments to posts
- Get comments
- Update comments
- Delete comments
- Associate comments with users and posts
- Owner authorization for comments

### ❤️ Likes
- Like posts
- Unlike posts
- Manage post likes
- Prevent duplicate likes

### 📊 MongoDB Aggregation
- `$match`
- `$group`
- `$sort`
- `$project`
- Aggregation pipelines
- Generate summarized blog data

### 🛡️ Validation & Error Handling
- Request validation
- Invalid ObjectId handling
- Missing-field validation
- Duplicate data handling
- Authentication errors
- Authorization errors
- Resource-not-found handling
- Error propagation using `next(error)`

### 📄 API Features
- Search
- Filtering
- Sorting
- Pagination
- Query parameters
- MongoDB queries
- Mongoose relationships

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Postman | API testing |
| REST API | API architecture |

---

# 📁 Project Structure

```text
blog-post-api/
│
├── controllers/
│   ├── authController.js
│   ├── postController.js
│   └── commentController.js
│
├── models/
│   ├── userModel.js
│   ├── postModel.js
│   └── commentModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── postRoutes.js
│   └── commentRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── utils/
│   └── ...
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

## 2. Navigate into the project

```bash
cd blog-post-api
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create `.env`

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 5. Start the server

For development:

```bash
npm run dev
```

Or:

```bash
node server.js
```

The API will run on:

```text
http://localhost:3000
```

---

# 🔑 Authentication

The API uses **JWT (JSON Web Token)** authentication.

After successful login, the server returns a JWT token.

Use the token in protected requests:

```http
Authorization: Bearer <your_token>
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The authentication middleware verifies the token and attaches the authenticated user's information to:

```javascript
req.user
```

---

# 🔗 API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Login User

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Example response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

# 📰 Post APIs

## Create Post

```http
POST /api/posts
```

**Authentication:** Required

Example:

```json
{
  "title": "Introduction to Node.js",
  "content": "Node.js is a JavaScript runtime...",
  "category": "Programming"
}
```

The authenticated user becomes the author of the post.

---

## Get All Posts

```http
GET /api/posts
```

Returns all available blog posts.

---

## Get Single Post

```http
GET /api/posts/:id
```

Example:

```http
GET /api/posts/64f123abc456def789
```

---

## Update Post

```http
PUT /api/posts/:id
```

**Authentication:** Required

Only the authorized owner can update the post.

Example:

```json
{
  "title": "Updated Node.js Guide",
  "content": "Updated blog content...",
  "category": "Backend"
}
```

---

## Delete Post

```http
DELETE /api/posts/:id
```

**Authentication:** Required

Only an authorized user can delete the post.

---

# 🔍 Search Posts

Posts can be searched using query parameters.

Example:

```http
GET /api/posts?search=node
```

This allows users to search blog posts based on supported fields.

---

# 🗂️ Filter Posts

Posts can be filtered using query parameters.

Example:

```http
GET /api/posts?category=Programming
```

---

# ↕️ Sort Posts

Posts can be sorted using query parameters.

Example:

```http
GET /api/posts?sort=createdAt
```

Newest posts can be displayed first using descending sorting.

---

# 📄 Pagination

The API supports pagination for large numbers of posts.

Example:

```http
GET /api/posts?page=1&limit=10
```

Where:

- `page` → Page number
- `limit` → Number of posts per page

Example:

```text
Page 1 → Posts 1–10
Page 2 → Posts 11–20
Page 3 → Posts 21–30
```

Invalid page values are rejected by the API.

---

# 💬 Comment APIs

Comments are associated with both:

```text
User
  ↓
Comment
  ↓
Post
```

This creates relationships between users, comments, and posts.

---

## Create Comment

```http
POST /api/posts/:postId/comments
```

**Authentication:** Required

Example:

```json
{
  "content": "Great article!"
}
```

---

## Get Comments

```http
GET /api/posts/:postId/comments
```

Returns comments associated with the specified post.

---

## Update Comment

```http
PUT /api/comments/:id
```

**Authentication:** Required

Only the comment owner can update the comment.

---

## Delete Comment

```http
DELETE /api/comments/:id
```

**Authentication:** Required

Only an authorized user can delete the comment.

---

# ❤️ Like APIs

Posts support like/unlike functionality.

Example:

```http
POST /api/posts/:id/like
```

To remove a like:

```http
DELETE /api/posts/:id/like
```

The API prevents the same user from liking the same post multiple times.

---

# 🗄️ Database Relationships

The application uses MongoDB with Mongoose references.

### User → Posts

```text
User
 |
 └── Posts
```

A post stores the author's ID:

```javascript
author: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
```

---

### User → Comments

```text
User
 |
 └── Comments
```

---

### Post → Comments

```text
Post
 |
 └── Comments
```

This allows related information to be retrieved using Mongoose's `populate()` functionality.

Example:

```javascript
.populate("author", "name email")
```

---

# 📊 MongoDB Aggregation

The project also uses MongoDB aggregation pipelines for processing and summarizing data.

Common aggregation stages used include:

```javascript
$match
$group
$sort
$project
```

Example structure:

```javascript
const result = await Post.aggregate([
  {
    $match: {
      category: "Technology"
    }
  },
  {
    $group: {
      _id: "$category",
      totalPosts: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      totalPosts: -1
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      totalPosts: 1
    }
  }
]);
```

---

# 🛡️ Error Handling

The API handles errors using Express middleware.

Controllers pass errors to the error-handling middleware using:

```javascript
next(error);
```

This keeps error handling centralized instead of repeating the same response logic in every controller.

Typical HTTP status codes include:

| Status | Meaning |
|---|---|
| `200` | Success |
| `201` | Resource created |
| `400` | Bad request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Resource not found |
| `409` | Conflict |
| `500` | Internal server error |

---

# 🔐 Security

The project implements several basic backend security practices:

- Password hashing using `bcrypt`
- JWT authentication
- Protected API routes
- Authorization checks
- Environment variables for secrets
- Validation of incoming requests
- Prevention of unauthorized updates/deletions

Sensitive information such as:

```text
MONGO_URI
JWT_SECRET
```

should never be committed to GitHub.

Add `.env` to `.gitignore`:

```gitignore
node_modules/
.env
```

---

# 🧪 Testing With Postman

The API can be tested using **Postman**.

Recommended testing order:

```text
1. Register
      ↓
2. Login
      ↓
3. Copy JWT token
      ↓
4. Add token to Authorization
      ↓
5. Create Post
      ↓
6. Get Posts
      ↓
7. Update Post
      ↓
8. Add Comment
      ↓
9. Update/Delete Comment
      ↓
10. Like/Unlike Post
      ↓
11. Test Search/Filter/Sort
      ↓
12. Test Pagination
      ↓
13. Test Error Cases
```

For protected routes, select:

```text
Authorization
→ Bearer Token
→ <JWT_TOKEN>
```

---

# 📌 Example Request Flow

A typical request works like this:

```text
Client
  ↓
Express Route
  ↓
Authentication Middleware
  ↓
Controller
  ↓
Mongoose
  ↓
MongoDB
  ↓
Controller
  ↓
JSON Response
```

For example:

```text
POST /api/posts
       ↓
authMiddleware
       ↓
Verify JWT
       ↓
postController
       ↓
Post.create()
       ↓
MongoDB
       ↓
Response
```

---

# 🎯 Learning Outcomes

By completing this project, the following backend concepts were practiced:

- Node.js fundamentals
- Express.js
- REST API development
- MVC architecture
- MongoDB
- Mongoose
- CRUD operations
- MongoDB relationships
- `ObjectId`
- `populate()`
- JWT authentication
- bcrypt password hashing
- Authentication middleware
- Authorization
- Query parameters
- Search
- Filtering
- Sorting
- Pagination
- Comments system
- Like/unlike functionality
- MongoDB aggregation
- `$match`
- `$group`
- `$sort`
- `$project`
- Request validation
- HTTP status codes
- Centralized error handling
- `next(error)`
- API testing with Postman

---

# 📈 Project Progression

This project is part of a progressive backend learning path:

```text
Project 1
Todo API
   ↓
CRUD Operations
   ↓
Project 2
Expense Tracker API
   ↓
Authentication + Filtering + Pagination + Aggregation
   ↓
Project 3
Blog Post API
   ↓
Authentication + Authorization
   ↓
Relationships
   ↓
Posts
   ↓
Comments
   ↓
Likes
   ↓
Search + Filter + Sort + Pagination
   ↓
Aggregation
   ↓
Centralized Error Handling
```

---

# 🚀 Future Improvements

Possible future improvements include:

- Image upload for blog posts
- User profile management
- Refresh tokens
- Email verification
- Password reset
- Admin dashboard
- Post bookmarking
- Post views/analytics
- Tags
- Post sharing
- Rate limiting
- API documentation using Swagger
- Deployment using Docker
- Cloud deployment

---

# 👨‍💻 Author

**Karthik Raju**

Full Stack Developer | MERN Stack | Backend Development

---

# ⭐ If You Like This Project

If this project helped you learn backend development, consider giving the repository a ⭐ on GitHub.

```text
Built with Node.js + Express.js + MongoDB + Mongoose ❤️
```

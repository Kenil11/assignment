# 📚 Book Review API

A simple REST API to manage books and their reviews. Built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.

---

## 🔧 Installation

```bash
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

---

## 🔐 Authentication

| Endpoint       | Method | Description           | Auth Required |
|----------------|--------|-----------------------|----------------|
| `/auth/signup` | POST   | Register new user     | ❌             |
| `/auth/login`  | POST   | Login existing user   | ❌             |

---

## 📚 Books

| Endpoint      | Method | Description             | Auth Required |
|---------------|--------|-------------------------|----------------|
| `/books`      | POST   | Create a new book       | ✅             |
| `/books`      | GET    | Get all books (paginated) | ❌           |
| `/books/:id`  | GET    | Get a single book by ID | ❌             |

---

## ⭐ Reviews

| Endpoint                     | Method | Description           | Auth Required |
|------------------------------|--------|-----------------------|----------------|
| `/books/:id/reviews`         | POST   | Add review to book    | ✅             |
| `/reviews/:reviewId`         | PUT    | Update review         | ✅             |
| `/reviews/:reviewId`         | DELETE | Delete review         | ✅             |

---

## 🧪 Example Requests

### ➕ Signup

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "secure123"
  }'
```

### 🔐 Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "secure123"
  }'
```

### 📚 Add Book

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "genre": "Programming",
    "publishedYear": 2008
  }'
```

### ⭐ Add Review

```bash
curl -X POST http://localhost:5000/api/books/<bookId>/reviews \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Excellent reference book!"
  }'
```

---

## 🧾 Models

### 📘 Book Model (Mongoose)

```js
{
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: Number },
  averageRating: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}
```

### ⭐ Review Model (Mongoose)

```js
{
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 500 },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}
```

---

## ✅ Validation Rules (Joi)

### 🧑 User Registration

```js
{
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}
```

### 📘 Book Creation

```js
{
  title: Joi.string().min(2).max(100).required(),
  author: Joi.string().min(2).max(50).required(),
  genre: Joi.string().min(2).max(30).required(),
  publishedYear: Joi.number().integer().min(1000).max(2025)
}
```

### ⭐ Review Creation

```js
{
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500)
}
```

---

## 🧠 Design Decisions

- **MongoDB with Mongoose** – flexible schema, indexing, and pre-hooks.
- **JWT Authentication** – secure and stateless.
- **Validation with Joi** – strict input checks for robustness.
- **Single Review/User Constraint** – ensures 1 review per user per book.
- **Security Middleware** – Helmet, CORS, and rate limiter enabled.

---

## 📜 License

MIT License – you're free to use, modify, and distribute.

---

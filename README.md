
# 🍲 Securin Recipes Fullstack App

A full-stack assignment project to parse recipe data, store it in a database, and expose it via an API with a React frontend.

---

## 🚀 Tech Stack

### Backend
- **Node.js + Express** (API server)
- **PostgreSQL** (database)
- **TypeScript**
- **Zod** (data validation)
- **CORS & dotenv**

### Frontend
- **React 18** + **Vite**
- **Axios** (API calls)
- **TypeScript**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/securin-recipes.git
cd securin-recipes
````

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

* Copy `.env.example` → `.env`
* Update database connection string in `.env`

Run migrations:

```bash
psql $DATABASE_URL -f schema.sql
```

Start backend:

```bash
npm run dev
```

API should be live at **[http://localhost:8080/api/recipes](http://localhost:8080/api/recipes)**

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at **[http://localhost:5173](http://localhost:5173)**

---

## 📂 Project Structure

```
Securin-Assignment/
├── backend/        # Express + TS backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── db/
│   │   ├── utils/
│   │   └── server.ts
│   ├── schema.sql
│   └── tsconfig.json
├── frontend/       # React + Vite frontend
│   ├── src/
│   ├── index.html
│   └── vite.config.ts
└── README.md
```

---

## 🛠️ Scripts

### Backend

* `npm run dev` → Run backend with tsx
* `npm run build` → Compile TS → JS
* `npm start` → Run compiled server

### Frontend

* `npm run dev` → Start frontend (Vite)
* `npm run build` → Build production assets
* `npm run preview` → Preview production build

---

## ✅ Features

* Parse recipe JSON and store in PostgreSQL
* REST API with pagination, sorting, filtering
* React UI for viewing recipes
* Docker-ready setup (via `docker-compose.yml`)

---

## 🧑‍💻 Author

* Developed by GopalChinta


# 🖥️ Portfolio — Yannick Lebec

Portfolio personnel développé avec **Go** (backend) et **React** (frontend), présentant mon parcours et mes projets web.

---

## 👨‍💻 Qui suis-je ?

Après **25 ans dans le BTP** — formation aux Compagnons du Devoir, salarié, puis chef d'entreprise et chef d'équipe — j'ai entamé une **reconversion dans le développement web** en septembre 2025 à l'**Ada Tech School** (Paris).

Mon parcours atypique m'a forgé des qualités rares dans le monde du dev : écoute du besoin client, gestion de projet, sens des responsabilités et rigueur. Je suis actuellement à la recherche d'un **stage ou d'une alternance** dans une entreprise bienveillante.

---

## 🛠️ Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | React 19, TypeScript, Tailwind CSS, Vite |
| Backend | Go, Gin, GORM |
| Base de données | PostgreSQL (Neon) |
| Auth | JWT |

---

## 🚀 Lancer le projet en local

### Prérequis
- [Go](https://golang.org/) 1.21+
- [Node.js](https://nodejs.org/) 18+
- Un compte [Neon](https://neon.tech) (PostgreSQL serverless)

### 1. Backend

```bash
cd backend
cp .env.example .env
# Remplis DATABASE_URL, JWT_SECRET et ADMIN_PASSWORD dans .env
go run main.go
```

Le serveur démarre sur **http://localhost:8080**

### 2. Frontend

```bash
npm install
npm run dev
```

Le site est accessible sur **http://localhost:5173**

---

## 📁 Structure du projet

```
portfolio/
├── backend/
│   ├── main.go              # Point d'entrée + routes
│   ├── database/db.go       # Connexion PostgreSQL (Neon)
│   ├── models/project.go    # Modèle GORM
│   ├── handlers/            # Logique métier (auth + projets)
│   └── middleware/auth.go   # Protection JWT des routes admin
└── src/
    ├── pages/               # Home, Login, Admin
    ├── components/          # Hero, About, Projects, Contact
    ├── api/client.ts        # Appels vers le backend
    └── types/               # Types TypeScript partagés
```

---

## 🔐 Espace admin

Accessible sur `/admin/login` — permet d'ajouter, modifier et supprimer des projets depuis une interface dédiée.

---

## 📬 Contact

- **Email** : yannick.lebec.dev@gmail.com
- **GitHub** : [github.com/yannick-lebec](https://github.com/yannick-lebec)
- **LinkedIn** : [linkedin.com/in/yannick-le-bec-dev](https://www.linkedin.com/in/yannick-le-bec-dev)

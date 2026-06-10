# Inventory Manager

A full-stack inventory management dashboard built by **Oliur Rahman** with Next.js 16, MongoDB, Auth.js v5, and ShadCN UI.

[Live Demo](https://nextjs-external.vercel.app) · [GitHub](https://github.com/oliur-portfolio/nextjs-external)

---

## Tech Stack

Next.js 16 · TypeScript · MongoDB · Mongoose · Auth.js v5 · React Hook Form · Zod · ShadCN UI · Tailwind CSS · TanStack Query

---

## Features

- Product CRUD — create, edit, delete, status management
- Role-based access — admin and user zones
- Authentication — email/password and Google OAuth
- Protected routes — middleware with JWT session
- Form validation — Zod schemas shared between API and client
- API protection — server-side role guard on all mutating endpoints

---

## Getting Started

**1. Clone and install**

```bash
git clone https://github.com/oliur-portfolio/nextjs-external.git
cd nextjs-external
npm install
```

**2. Environment variables**

Create `.env.local`:

```bash
MONGODB_URI=
AUTH_SECRET=
AUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate `AUTH_SECRET`:

```bash
npx auth secret
```

**3. Run**

```bash
npm run dev
```

---

## Google OAuth Setup

In [Google Cloud Console](https://console.cloud.google.com) add this redirect URI:

```
http://localhost:3000/api/auth/callback/google
```

---

## Deployment

Deploy on Vercel. Add all environment variables from `.env.local` to your project settings and update the Google redirect URI to your production domain.

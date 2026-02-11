# Personal Website

My personal website built with [Astro](https://astro.build). It serves as a
central hub for my work, writing, and open source projects.

## ✨ Overview

This site includes:

- **Home** – Overview page featuring:
  - GitHub contribution graph
  - Recent blog posts
  - Recent projects

- **Blog** – A complete list of all blog posts
- **Projects** – Automatically pulls and displays my latest public GitHub
  repositories
- **Individual Blog Pages** – Dedicated sub-pages for each post

The goal of this site is to keep everything I’m working on in one clean, fast,
and minimal place.

---

## 🛠 Tech Stack

- **Astro** – Static site framework
- **GitHub API** – Fetches repositories and contribution data
- Markdown for blog posts
- Deployed as a static site

---

## 📂 Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Routes (home, blog, projects, etc.)
│   │   └── blog/       # Individual blog post pages
│   └── content/        # Blog content (Markdown files)
├── astro.config.mjs
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jjcavallo5/site.git
cd site
```

### 2. Install dependencies

```bash
pnpm i
```

### 3. Start the development server

```bash
pnpm run dev
```

The site will be available at:

```
http://localhost:4321
```

---

## 📝 Writing a Blog Post

1. Add a new Markdown file inside the blog content directory (e.g.
   `src/content/blog/`).
2. Include frontmatter at the top:

```md
---
title: "My Blog Post"
description: "Short summary of the post"
date: 2026-01-01
tags: ["astro", "web"]
---
```

3. Write your content below the frontmatter.
4. The post will automatically appear on the Blog page and, if recent, on the
   Home page.

---

## 🔌 GitHub Integration

The Projects page and contribution graph pull data from GitHub. Depending on
your setup, you may need to configure:

- A GitHub username
- A GitHub API token (via environment variables)

Example:

```bash
GITHUB_TOKEN=your_token_here
```

---

## 🧱 Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

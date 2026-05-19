# 🗺️ Maps Dashboard White Label

> A Modern, Interactive Maps Dashboard Application - White Label Solution

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-FF1B6D?style=for-the-badge&logo=next.js&logoColor=white&labelColor=FF1B6D)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black&labelColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=06B6D4)

![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-5.24.0-1AB7EA?style=for-the-badge&logoColor=white&labelColor=1AB7EA)
![Tauri](https://img.shields.io/badge/Tauri-2.11.1-FFE821?style=for-the-badge&logo=tauri&logoColor=black&labelColor=FFE821)
![Zod](https://img.shields.io/badge/Zod-4.4.3-3E67AC?style=for-the-badge&logoColor=white&labelColor=3E67AC)

![Version](https://img.shields.io/badge/Version-0.1.0-FF006E?style=for-the-badge&labelColor=FF006E)
![Node Version](https://img.shields.io/badge/Node-20-68A063?style=for-the-badge&logo=node.js&logoColor=white&labelColor=68A063)
![Status](https://img.shields.io/badge/Status-Active-00D084?style=for-the-badge&labelColor=00D084)

---

## 👨‍💻 Team Members

| Name | Roll Number |
|------|-------------|
| Mohit Chitkara | 2210991929 |
| Tanisha Chopra | 2210992441 |
| Ayush Dua | 2210991133 |
| Ayush Dua | 2210992105 |

---

## 🚀 Features

- 🗺️ **Interactive Map Integration** - Built with MapLibre GL for rich, customizable maps
- ⚡ **Modern Stack** - Next.js 16 with React 19 and TypeScript
- 🎨 **Beautiful UI** - Tailwind CSS with custom animations and components
- 🖥️ **Desktop & Web** - Cross-platform support with Tauri
- 📦 **State Management** - Zustand for efficient state handling
- 🎭 **Smooth Animations** - Framer Motion for engaging interactions
- 📍 **Location Tracking** - Advanced location and sidebar controls
- 🔍 **Type-Safe** - Full TypeScript support with Zod validation
- 🎯 **White Label Ready** - Fully customizable for your brand

---

## 📋 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | Next.js 16.2.6 |
| **UI Library** | React 19.2.4 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Maps** | MapLibre GL 5.24.0 |
| **Desktop** | Tauri 2.11.1 |
| **Animations** | Framer Motion 12.38.0 |
| **State Management** | Zustand 5.0.13 |
| **Icons** | Lucide React, React Icons |
| **Validation** | Zod 4.4.3 |
| **Package Manager** | Bun / NPM |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- Bun or NPM/Yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jettspanner123/Maps-Dashboard-White-Label.git
   cd mohit-madarchod
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

### Development

**Run the development server:**

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

**Run with Tauri (Desktop):**

```bash
bun run dev:start
```

### Building

**Build for production:**

```bash
bun run build
# or
npm run build
```

**Start production server:**

```bash
bun run start
# or
npm start
```

---

## 📁 Project Structure

```
.
├── app/                           # Next.js App Router
│   ├── screens/                   # Screen components
│   │   ├── loader/               # Loading screen
│   │   └── homscreen/            # Home screen with maps
│   ├── components/               # Reusable components
│   │   ├── shared/              # Shared components
│   │   └── static/              # Static components
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── lib/                           # Utility functions
├── public/                        # Static assets
├── src-tauri/                     # Tauri desktop app
├── components.json               # Component config
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
└── next.config.ts               # Next.js configuration
```

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run dev:start` | Start with Tauri desktop app |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run tauri` | Run Tauri CLI commands |

---

## 📦 Key Dependencies

### Frontend
- **next** - React framework
- **react** & **react-dom** - UI library
- **maplibre-gl** - Interactive maps
- **framer-motion** - Animations
- **tailwindcss** - Utility-first CSS
- **zustand** - State management
- **zod** - TypeScript-first schema validation

### Desktop
- **tauri** - Cross-platform desktop framework

### Development
- **typescript** - Type safety
- **eslint** - Code linting
- **tailwindcss** - CSS framework

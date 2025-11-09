# WhatsApp-Inspired Portfolio Website

A modern, responsive portfolio website with a WhatsApp-inspired UI built using Next.js 16, TypeScript, and Tailwind CSS. Features a dynamic blog system, progress tracking, and dark mode support.

## 🌟 Features

### Core Features
- 📱 WhatsApp-inspired UI with dark/light mode
- 📊 Responsive layout for all devices
- 🚀 Server-side rendering with Next.js
- 🎨 Tailwind CSS for styling
- 🌙 Dark mode support using next-themes
- ✨ Smooth animations with Framer Motion

### Interactive Sections
- 🏠 About Me - Professional summary and contact info
- 💼 Experience - Work history with detailed descriptions
- 🛠️ Projects - Showcase of technical projects
- 📜 Certifications - Professional certifications display
- 📝 Blog - Full CRUD functionality with optimistic updates
- 📈 Progress Tracking - Learning journey updates

### Technical Features
- 🔄 Optimistic UI updates for better UX
- 🎯 Field-level form validation
- 🚦 Error boundaries for graceful error handling
- 📊 MongoDB integration for data persistence
- 🌐 RESTful API endpoints
- 🎭 TypeScript for type safety

## 🛠️ Tech Stack

- **Frontend:**
  - Next.js 16 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - next-themes

- **Backend:**
  - Next.js API Routes
  - MongoDB
  - Mongoose

- **Development Tools:**
  - ESLint
  - PostCSS
  - Autoprefixer

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB instance (local or Atlas)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jayatripathi2002/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── components/   # React components
│   │   ├── models/       # MongoDB models
│   │   └── utils/        # Utility functions
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🔧 API Endpoints

- `GET /api/blog` - Fetch all blog posts
- `POST /api/blog` - Create new blog post
- `PATCH /api/blog/[id]` - Update blog post
- `DELETE /api/blog/[id]` - Delete blog post
- `GET /api/progress` - Fetch progress updates
- `POST /api/progress` - Create progress update
- `PATCH /api/progress/[id]` - Update progress
- `DELETE /api/progress/[id]` - Delete progress

## 🎨 Customization

### Theme Configuration
Modify `tailwind.config.js` to customize:
- Color schemes
- Typography
- Dark mode preferences
- Responsive breakpoints

### Content Updates
Edit the following files to update content:
- `main-content.tsx` - Experience, projects, certifications
- `layout.tsx` - Site-wide configuration
- `globals.css` - Global styles

## 📦 Deployment

Deploy on Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjayatripathi2002%2Fportfolio)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

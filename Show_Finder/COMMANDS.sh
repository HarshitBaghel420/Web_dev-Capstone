#!/bin/bash
# CineSearch - Command Reference Guide

# ============================================================
# 🚀 QUICK START COMMANDS
# ============================================================

# Navigate to project
cd "c:/Users/RADHE/OneDrive/Desktop/Web_dev Capstone/Show_Finder"

# Install dependencies (already done)
npm install

# Start development server
npm run dev
# → Open http://localhost:5173 in browser

# Build for production
npm run build

# Preview production build
npm run preview


# ============================================================
# 📊 VERIFICATION COMMANDS
# ============================================================

# Check build status
npm run build

# List all project files
find src -type f | sort

# Check installed dependencies
npm list --depth=0

# View project info
cat package.json


# ============================================================
# 🧪 TESTING COMMANDS
# ============================================================

# Run ESLint
npm run lint

# Check for issues
npm run lint --fix


# ============================================================
# 📁 PROJECT STRUCTURE QUICK VIEW
# ============================================================

# View src folder structure
tree src

# Or list with details
ls -la src/components/
ls -la src/contexts/
ls -la src/pages/
ls -la src/hooks/
ls -la src/services/


# ============================================================
# 💾 DEVELOPER TOOLS
# ============================================================

# Clear cache and reinstall (if needed)
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version

# Check npm version
npm --version


# ============================================================
# 📝 FILES TO REVIEW
# ============================================================

# Documentation
cat README.md              # Full documentation
cat QUICKSTART.md          # Quick start guide
cat PROJECT_DELIVERY.md    # Technical specifications
cat DELIVERY_SUMMARY.txt   # This summary

# Configuration
cat package.json           # Dependencies
cat tailwind.config.js     # Tailwind setup
cat postcss.config.js      # PostCSS setup
cat vite.config.js         # Vite configuration

# Core files
cat src/App.jsx           # Main app with routing
cat src/contexts/FavoritesContext.jsx   # CRUD logic
cat src/contexts/ThemeContext.jsx       # Dark mode
cat src/hooks/useDebounce.js            # Debounce hook
cat src/services/api.js                 # API integration


# ============================================================
# 🎯 FEATURE TESTING CHECKLIST
# ============================================================

# 1. Search & Filter
#    - Open http://localhost:5173
#    - Type "Inception" in search bar
#    - Watch 500ms debounce in action
#    - Filter by Year: 2010
#    - Filter by Type: Movie

# 2. Add to Favorites
#    - Click heart icon on movie
#    - Heart turns red
#    - DevTools → Application → localStorage
#    - Verify "favorites" key exists

# 3. Movie Details
#    - Click any movie card
#    - View full details page
#    - Click "Add to Favorites"
#    - Go back to home

# 4. Favorites Page
#    - Navigate to /favorites
#    - See all saved movies
#    - View statistics (Total, Rated, Average)

# 5. Rate Movies
#    - Click on star rating (⭐)
#    - Select 1-5 stars
#    - Verify rating displays
#    - Check average rating updates

# 6. Dark Mode
#    - Click moon icon (🌙) in navbar
#    - All UI components change to dark
#    - Refresh page
#    - Verify theme persists

# 7. Error Handling
#    - Search for non-existent movie: "xyzabc123"
#    - Error message displays
#    - Click "Try Again" button

# 8. Responsive Design
#    - Resize browser to 375px (mobile)
#    - Resize to 768px (tablet)
#    - Resize to 1440px (desktop)
#    - Verify layouts adapt


# ============================================================
# 🔍 DEBUGGING TIPS
# ============================================================

# Check if dev server is running
lsof -i :5173

# Kill dev server if stuck
killall node

# Clear browser cache
# DevTools → Settings → Network → Disable cache
# Or press Ctrl+Shift+Delete

# View console errors
# DevTools → Console tab

# View network requests
# DevTools → Network tab → Search API calls

# View localStorage
# DevTools → Application → Storage → localStorage


# ============================================================
# 📊 PROJECT STATISTICS
# ============================================================

# Count files
find src -type f -name "*.jsx" -o -name "*.js" | wc -l
# → 14 source files

# Count lines of code
find src -name "*.jsx" -o -name "*.js" | xargs wc -l | tail -1

# File sizes
du -sh src/
du -sh node_modules/

# Build size
du -sh dist/


# ============================================================
# 🚀 DEPLOYMENT COMMANDS
# ============================================================

# Build production version
npm run build

# Output directory: dist/
# Deploy dist/ folder to:
# - Vercel: vercel --prod
# - Netlify: netlify deploy --prod
# - GitHub Pages: gh-pages -d dist
# - AWS S3: aws s3 sync dist/ s3://bucket-name


# ============================================================
# 📚 DOCUMENTATION QUICK LINKS
# ============================================================

# Full Documentation
# → README.md (350+ lines)
# → Complete features, tech stack, API docs

# Quick Start
# → QUICKSTART.md (400+ lines)
# → Installation, feature walkthrough, testing

# Technical Specs
# → PROJECT_DELIVERY.md
# → Implementation details, rubric alignment

# This file
# → DELIVERY_SUMMARY.txt
# → Project overview and status


# ============================================================
# ✅ VERIFICATION CHECKLIST
# ============================================================

# [✓] All 14 source files created
# [✓] Project builds successfully
# [✓] Dev server runs on localhost:5173
# [✓] Dark mode with localStorage persistence
# [✓] CRUD operations on favorites
# [✓] Search with 500ms debounce
# [✓] Error handling implemented
# [✓] Performance optimization (React.lazy)
# [✓] Responsive design working
# [✓] Documentation complete


# ============================================================
# 🎉 YOU'RE ALL SET!
# ============================================================

# To start:
#   1. cd "c:/Users/RADHE/OneDrive/Desktop/Web_dev Capstone/Show_Finder"
#   2. npm run dev
#   3. Open http://localhost:5173

# Questions? Check:
#   - README.md for full documentation
#   - QUICKSTART.md for quick start
#   - PROJECT_DELIVERY.md for technical details
#   - Code comments in each file

# Ready for submission! 🚀

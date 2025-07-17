# Kombee Storefront – E-commerce Assignment

This project is a modern, production-ready e-commerce storefront built from scratch for the Kombee assignment. It demonstrates senior-level frontend engineering with Next.js (App Router), TypeScript, Apollo GraphQL, and Tailwind CSS. All data and business logic are powered by the GraphQL APIs provided in the Postman collection.

---

## 🚀 Live Demo

[View the deployed app on Vercel](https://your-vercel-link.vercel.app) <!-- Replace with your actual deployment link -->

---

## ✅ What’s Done (Core & Bonus Features)

- **Authentication:** Login with GraphQL mutation, session stored in cookies
- **Product Listing Page (PLP):**
  - Server-side product listing (SSR/SSG)
  - Infinite scroll (cursor-based pagination)
  - Debounced search (server-side)
  - Skeleton loading for fast perceived performance
  - Lazy-loaded images with robust fallback (no broken images)
- **Product Detail Page (PDP):**
  - Product details, error-proof data access
- **Cart Page:**
  - Persistent cart (localStorage), add/remove/clear, price calculation
- **Checkout Page:**
  - Form validation, order summary, error handling
- **Global Error Handling:**
  - Error boundaries, toast notifications, robust null checks
- **Responsive UI:** Mobile-first, accessible, clean design
- **Performance:** SSR/SSG for main pages, lazy-loaded images
- **CI/CD:** Automated with GitHub Actions (see below)
- **Production Cleanliness:** All console.log, console.warn, and console.error statements removed for a clean build
- **State Management:** React Context for cart and toast, cookies for auth
- **Type Safety:** TypeScript throughout
- **No UI Frameworks:** All UI built from scratch with Tailwind CSS (no design files)

---

## 🟡 Pending / Optional Enhancements

- **Advanced Filters & Sorting:** UI and GraphQL integration for category, price, etc.
- **Order History:** (Removed as per requirements, but architecture supports easy addition)
- **Comprehensive Automated Testing:** Add more unit/integration tests with Jest and React Testing Library
- **Wishlist:** (Removed as per requirements, but can be re-enabled easily)
- **Further UI Polish:** Micro-interactions, accessibility, and mobile optimizations
- **Production Deployment:** Ensure live link is added above

---

## 🧠 Senior-Level Decisions & Practices

- **SSR/SSG:** Product list and detail pages use server-side rendering for SEO and performance
- **State Management:** Cart and toast notifications use React Context for simplicity and scalability; session via cookies
- **Error Handling:**
  - All data access uses optional chaining and guards
  - Global error boundary for UI crashes
  - Toast notifications for user feedback
  - All console output removed for production cleanliness
- **Styling:** Tailwind CSS for rapid, consistent, and responsive design
- **API Integration:** All data comes from the GraphQL endpoints in the provided Postman collection—no mock data
- **Debounced Search:** Search is server-side, debounced, and scalable for large catalogs
- **Image Fallback:** Product images automatically fall back to a placeholder if the main image fails to load
- **CI/CD:** GitHub Actions workflow (`.github/workflows/nextjs.yml`, named 'Storefront CI') runs install, build, and lint on every push/PR to `main`
- **Clean Code:** Modular, scalable, and idiomatic TypeScript/React codebase
- **Documentation:** This README clearly communicates architecture, decisions, and pending enhancements

---

## 🏁 How to Run Locally

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/kombee-storefront.git
   cd kombee-storefront
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set environment variables:**
   - Copy `.env.example` to `.env.local` and set your GraphQL endpoint if needed
4. **Run the dev server:**
   ```bash
   npm run dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

---

## 🚢 Deployment & CI/CD

This project is ready for deployment on Vercel, Netlify, or any platform supporting Next.js.

### CI/CD: GitHub Actions

Automated with GitHub Actions: see `.github/workflows/nextjs.yml` (Storefront CI).
Every push/PR to `main` triggers install, build, and lint steps.

---

## 🙋‍♂️ Feedback & Questions

If you have any questions or need clarification, please reach out! I’m happy to discuss my decisions, tradeoffs, or how I’d approach any of the pending features.

---

**Thank you for reviewing my submission!**

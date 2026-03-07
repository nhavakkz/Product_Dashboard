# Product Dashboard

A responsive product dashboard built with Next.js and Tailwind CSS. It pulls product data from the [Fake Store API](https://fakestoreapi.com/) and lets users search, filter, and sort through a collection of items.

## Features

- Fetches and displays 20 products from the Fake Store API
- Product cards showing image, category, title, rating, and price
- Real-time search across product titles and descriptions
- Filter products by category (electronics, jewelery, men's/women's clothing)
- Sort by price (low/high), rating, or name
- Fully responsive - works on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + inline styles
- **Language**: TypeScript
- **API**: Fake Store API (https://fakestoreapi.com/products)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/product-dashboard.git
   cd product-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
product-dashboard/
├── app/
│   ├── globals.css       # Global styles and CSS variables
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page - fetches products server-side
├── components/
│   ├── Dashboard.tsx     # Client component - search, filter, sort logic
│   └── ProductCard.tsx   # Individual product card display
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
└── package.json
```

## How It Works

- **Server-side data fetching**: The main page (`app/page.tsx`) fetches all products from the API on the server before rendering. This means faster initial page load and better SEO.
- **Client-side interactivity**: The `Dashboard` component is a client component that handles search, filtering by category, and sorting - all without extra API calls since the data is already loaded.
- **Responsive grid**: Product cards are laid out in a CSS grid that adapts from 1 column on mobile to 3 columns on larger screens.

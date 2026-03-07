import Dashboard from "../components/Dashboard";
import { Product } from "../components/ProductCard";

// fetch products from the FakeStore API
async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 24px",
      }}
    >
      {/* header */}
      <div style={{ marginBottom: "36px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "6px",
            color: "var(--foreground)",
          }}
        >
          Product Dashboard
        </h1>
        <p style={{ fontSize: "15px", color: "var(--muted)", margin: 0 }}>
          Browse our collection of {products.length} products
        </p>
      </div>

      {/* dashboard handles search, filter, sort on client side */}
      <Dashboard products={products} />
    </main>
  );
}
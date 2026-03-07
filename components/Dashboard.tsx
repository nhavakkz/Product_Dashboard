"use client";

import { useState, useMemo } from "react";
import ProductCard, { Product } from "./ProductCard";

interface DashboardProps {
    products: Product[];
}

export default function Dashboard({ products }: DashboardProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");

    // grab unique categories from the product list
    const categories = useMemo(() => {
        const cats = products.map((p) => p.category);
        return ["all", ...Array.from(new Set(cats))];
    }, [products]);

    // filter and sort logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // search filter - check title and description
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        // category filter
        if (selectedCategory !== "all") {
            result = result.filter((p) => p.category === selectedCategory);
        }

        // sorting
        switch (sortOption) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                result.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            case "name-az":
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return result;
    }, [products, searchQuery, selectedCategory, sortOption]);

    return (
        <div>
            {/* controls / toolbar */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "32px",
                    alignItems: "center",
                }}
            >
                {/* search bar */}
                <div style={{ flex: "1 1 280px", position: "relative" }}>
                    <span
                        style={{
                            position: "absolute",
                            left: "14px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--muted)",
                            fontSize: "16px",
                            pointerEvents: "none",
                        }}
                    >
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px 16px 12px 42px",
                            border: "1px solid var(--input-border)",
                            borderRadius: "10px",
                            fontSize: "14px",
                            background: "var(--input-bg)",
                            color: "var(--foreground)",
                            outline: "none",
                            transition: "border-color 0.15s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--input-border)")}
                    />
                </div>

                {/* category filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                        padding: "12px 16px",
                        border: "1px solid var(--input-border)",
                        borderRadius: "10px",
                        fontSize: "14px",
                        background: "var(--input-bg)",
                        color: "var(--foreground)",
                        cursor: "pointer",
                        outline: "none",
                        minWidth: "160px",
                    }}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat === "all"
                                ? "All Categories"
                                : cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>

                {/* sort dropdown */}
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    style={{
                        padding: "12px 16px",
                        border: "1px solid var(--input-border)",
                        borderRadius: "10px",
                        fontSize: "14px",
                        background: "var(--input-bg)",
                        color: "var(--foreground)",
                        cursor: "pointer",
                        outline: "none",
                        minWidth: "160px",
                    }}
                >
                    <option value="default">Sort by: Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name-az">Name: A to Z</option>
                </select>
            </div>

            {/* result count */}
            <p
                style={{
                    fontSize: "14px",
                    color: "var(--muted)",
                    marginBottom: "20px",
                }}
            >
                Showing {filteredProducts.length} of {products.length} products
            </p>

            {/* product grid */}
            {filteredProducts.length > 0 ? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div
                    style={{
                        textAlign: "center",
                        padding: "60px 20px",
                        color: "var(--muted)",
                    }}
                >
                    <p style={{ fontSize: "48px", marginBottom: "12px" }}>😕</p>
                    <p style={{ fontSize: "18px", fontWeight: 500 }}>No products found</p>
                    <p style={{ fontSize: "14px", marginTop: "6px" }}>
                        Try adjusting your search or filters
                    </p>
                </div>
            )}
        </div>
    );
}

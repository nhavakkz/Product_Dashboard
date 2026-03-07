export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export default function ProductCard({ product }: { product: Product }) {
    // render star icons based on rating
    const fullStars = Math.floor(product.rating.rate);
    const hasHalf = product.rating.rate - fullStars >= 0.5;

    return (
        <div
            style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: "var(--shadow-sm)",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            {/* product image */}
            <div
                style={{
                    height: "180px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    padding: "10px",
                }}
            >
                <img
                    src={product.image}
                    alt={product.title}
                    style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                    }}
                />
            </div>

            {/* category badge */}
            <span
                style={{
                    display: "inline-block",
                    width: "fit-content",
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    background: "var(--badge-bg)",
                    color: "var(--badge-text)",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    marginBottom: "10px",
                }}
            >
                {product.category}
            </span>

            {/* title */}
            <h3
                style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    margin: "0 0 8px 0",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    color: "var(--foreground)",
                }}
            >
                {product.title}
            </h3>

            {/* rating */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginBottom: "12px",
                }}
            >
                <div style={{ display: "flex", gap: "1px" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            style={{
                                color:
                                    star <= fullStars
                                        ? "#f59e0b"
                                        : star === fullStars + 1 && hasHalf
                                            ? "#f59e0b"
                                            : "#d1d5db",
                                fontSize: "14px",
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                    ({product.rating.count})
                </span>
            </div>

            {/* price */}
            <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                <span
                    style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "var(--foreground)",
                    }}
                >
                    ${product.price.toFixed(2)}
                </span>
            </div>
        </div>
    );
}
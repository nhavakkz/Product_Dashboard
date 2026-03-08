"use client";

import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';

export default function Home() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
// We tell the browser to fetch the data directly
fetch('https://fakestoreapi.com/products')
.then((res) => res.json())
.then((data) => {
setProducts(data);
setLoading(false);
})
.catch((error) => {
console.error("Error fetching data:", error);
setLoading(false);
});
}, []);

if (loading) {
return (
<div style={{ textAlign: "center", padding: "100px", fontSize: "20px" }}>
Loading your dashboard...
</div>
);
}

return (
<main style={{ padding: "32px", maxWidth: "1280px", margin: "0 auto" }}>
<h1 style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center", marginBottom: "40px" }}>
Product Dashboard
</h1>
<Dashboard products={products} />
</main>
);
}
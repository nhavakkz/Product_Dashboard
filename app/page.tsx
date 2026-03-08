export const dynamic = 'force-dynamic';

import Dashboard from '../components/Dashboard';

async function getProducts() {
const response = await fetch('', { cache: 'no-store' });

if (!response.ok) {
throw new Error('Failed to fetch products');
}

return response.json();
}

export default async function Home() {
const products = await getProducts();

return (
<main className="p-8 max-w-7xl mx-auto">
<h1 className="text-4xl font-bold text-center mb-10">Product Dashboard</h1>
<Dashboard products={products} />
</main>
);
}
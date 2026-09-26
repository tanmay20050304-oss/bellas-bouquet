import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://bellas-bouquet.onrender.com/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Products request failed: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Products response was not an array");
        }
        setProducts(data.slice(0, 6));
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <section className="py-16 bg-pink-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-pink-600 mb-4">
          Featured Bouquets 🌸
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Handcrafted bouquets for every special occasion.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {error ? (
            <p className="col-span-full text-center text-gray-600">
              Featured bouquets are unavailable right now. Please try again later.
            </p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;
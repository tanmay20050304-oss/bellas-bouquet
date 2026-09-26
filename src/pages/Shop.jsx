import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import API_URL from "../services/api";

function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/products`)
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
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <section className="bg-pink-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center text-pink-600">
            Shop Bouquets 🌸
          </h1>

          <div className="flex flex-col items-center mt-8 gap-4">

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <CategoryFilter
              products={products}
              category={category}
              setCategory={setCategory}
            />

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

            {error ? (
              <h2 className="text-center text-2xl text-gray-500 col-span-full">
                Bouquets are unavailable right now. Please try again later.
              </h2>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <h2 className="text-center text-2xl text-gray-500 col-span-full">
                No bouquets found.
              </h2>
            )}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Shop;
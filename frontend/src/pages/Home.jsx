import React from "react";
import ProductCard from "../components/ProductCard";
const Home = () => {
  return (
    <ProductCard
      product={{
        _id: "123",
        name: "Ocean Blue T-Shirt",
        description: "Soft cotton T-shirt perfect for summer.",
        price: 499,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      }}
      onAddToCart={(id) => console.log("Added to cart:", id)}
    />
  );
};

export default Home;

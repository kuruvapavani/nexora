import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 p-4 flex flex-col items-center text-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl mb-3"
      />

      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
        {product.description}
      </p>

      <p className="text-hero font-bold text-lg mt-3">₹{product.price}</p>

      <button
        onClick={() => onAddToCart(product._id)}
        className="mt-4 bg-hero text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition-all duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

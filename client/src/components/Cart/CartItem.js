import React from "react";

function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b pb-6 mb-6">
      <div className="flex items-center w-full md:w-auto">
        <img
          src={item.file}
          alt={item.title}
          className="w-16 h-16 rounded-md mr-6 object-contain"
        />
        <div className="flex flex-col">
          <p className="font-medium text-gray-800 text-lg">{item.title}</p>
          <div className="flex items-center mt-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md"
              onClick={() => onQuantityChange(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="mx-4 text-lg">{item.quantity}</span>
            <button
              className="px-4 py-2 bg-gray-200 rounded-md"
              onClick={() => onQuantityChange(item._id, item.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4 md:mt-0">
        <p className="text-gray-800 font-medium mr-6 text-lg">₹{item.price * item.quantity}</p>
        <button
          className="text-red-500 hover:text-red-700 font-semibold"
          onClick={() => onRemove(item._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default React.memo(CartItem);

import React from "react";

function PriceDetails({ totalItems, totalPrice }) {
  return (
    <div className="border p-8 rounded-lg shadow-md bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Price Details</h2>
      <div className="flex justify-between mb-4">
        <p className="text-gray-600">Total Items:</p>
        <p className="text-gray-800">{totalItems}</p>
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-gray-600">Total Price:</p>
        <p className="text-gray-800 font-bold">₹{totalPrice}</p>
      </div>
    </div>
  );
}




export default PriceDetails;


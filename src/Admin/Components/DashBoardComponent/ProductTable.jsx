import Avatar from "@mui/material/Avatar";
import React from "react";

function ProductTable({ item }) {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white  shadow-md p-4 mb-4 hover:shadow-lg transition cursor-pointer">
        {/* Product Image */}
        <div className="flex items-center space-x-4">
          <Avatar src={item.imageUrl} alt={item.title} sx={{ width: 56, height: 56 }} />
          <div>
            <p className="text-lg font-semibold text-gray-800">{item.title}</p>
            <p className="text-sm text-gray-500">{item.brand}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-wrap gap-4 mt-4 sm:mt-0 sm:ml-6 text-sm">
  {/* Price */}
  <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition">
    <span className="text-gray-500 font-medium">Price:</span>
    <span className="text-green-600 font-semibold">₹{item.discountedPrice}</span>
  </div>

  {/* Stock Quantity */}
  <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition">
    <span className="text-gray-500 font-medium">Stock:</span>
    <span className="text-blue-600 font-semibold">{item.quantity}</span>
  </div>

  {/* Category */}
  <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition">
    <span className="text-gray-500 font-medium">Category:</span>
    <span className="text-gray-700 font-semibold">{item.categoryName}</span>
  </div>
</div>

      </div>
    </>
  );
}

export default ProductTable;

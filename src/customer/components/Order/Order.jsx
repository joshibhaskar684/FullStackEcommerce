import React from "react";
import OrderCard from "./OrderCard";

const orderStatus = [
  { label: "On the way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Pending", value: "pending" },
  { label: "Returned", value: "returned" },
  { label: "Refunded", value: "refunded" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Out for delivery", value: "out_for_delivery" },
];

function Order() {
  return (
    <div className="px-5 lg:px-20 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filter */}
        <div className="lg:col-span-3">
          <div className="h-auto shadow-lg p-5 rounded-xl sticky top-5 bg-white">
            <h1 className="font-bold text-lg border-b pb-3">Filter</h1>

            <div className="mt-6 space-y-5">
              <h2 className="font-semibold text-gray-800">Order Status</h2>
              <div className="space-y-3">
                {orderStatus.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      value={item.value}
                      className="h-4 w-4 rounded border-gray-400 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-3 text-sm text-gray-600 group-hover:text-purple-600 transition-colors">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="lg:col-span-9 space-y-6">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <OrderCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;

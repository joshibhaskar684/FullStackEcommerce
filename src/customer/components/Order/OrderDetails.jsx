import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { FaStar } from "react-icons/fa";

function OrderDetails() {
  return (
    <div className="px-5 lg:px-20 py-10 space-y-10">
      {/* Delivery Address */}
      <div className="shadow-xl border rounded-lg p-5 bg-white">
        <h1 className="text-xl font-bold mb-5">Delivery Address</h1>
        <AddressCard />
      </div>

      {/* Order Tracker */}
      <div>
        <OrderTracker activeStep={2} />
      </div>

      {/* Order Items */}
      <div className="space-y-6">
        {[1, 1, 1, 1, 1].map((item, index) => (
          <div
            key={index}
            className="shadow-xl rounded-lg border p-5 flex flex-col md:flex-row items-start md:items-center justify-between bg-white"
          >
            {/* Left Section */}
            <div className="flex items-start gap-5">
              <img
                src="https://internship.aicte-india.org//images/new_logo/logo_internship_new.jpg"
                alt="Order"
                className="w-20 h-20 object-cover object-top rounded-md"
              />
              <div className="space-y-1">
                <p className="font-semibold text-gray-800">Product Title</p>
                <p className="text-xs text-gray-500 font-medium">
                  Size: XXX | Color: Blue Black
                </p>
                <p className="text-sm text-gray-600">Seller: Sell</p>
                <p className="text-sm font-semibold text-gray-800">₹400</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 text-purple-600 cursor-pointer hover:text-purple-700 mt-4 md:mt-0">
              <FaStar className="text-lg" />
              <span className="text-sm font-medium">
                Rate and Review Product
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;

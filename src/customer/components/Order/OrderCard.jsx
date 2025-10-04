import React from "react";
import { FaAdjust } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function OrderCard() {
  const navigate = useNavigate();

  const handleOrderDetails = () => {
    navigate(`/account/order/${5}`);
  };

  return (
    <div
      onClick={handleOrderDetails}
      className="border rounded-2xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Product info */}
        <div className="flex items-start gap-4">
          <img
            src="https://internship.aicte-india.org//images/new_logo/logo_internship_new.jpg"
            alt="Order"
            className="w-20 h-20 object-cover object-top rounded-lg"
          />
          <div className="space-y-1">
            <Link
              to={"/order/orderdetails"}
              className="font-semibold text-gray-800 hover:text-blue-600"
            >
              Product Name
            </Link>
            <p className="text-xs text-gray-500">Size: M</p>
            <p className="text-xs text-gray-500">Color: Black</p>
            <p className="text-xs text-gray-500">Quantity: 1</p>
          </div>
        </div>

        {/* Middle: Price */}
        <div className="text-lg font-semibold text-gray-800 md:text-center">
          ₹2000
        </div>

        {/* Right: Status */}
        <div className="flex flex-col items-start md:items-end">
          <div className="flex items-center gap-1 text-green-600">
            <FaAdjust />
            <span className="font-medium">Delivered</span>
          </div>
          <p className="text-xs text-gray-500">on 12/12/2023</p>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;

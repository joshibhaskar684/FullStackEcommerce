import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import React from "react";

function LatestOrder({ order }) {
  return (
    <div className="w-full border-b bg-white hover:bg-gray-50 transition rounded-lg p-4 mb-2 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Product Images + Titles */}
        <div className="flex items-center gap-4">
          <AvatarGroup max={3}>
            {order?.orderItems?.map((item) => (
              <Avatar
                key={item.id}
                src={item?.product?.imageUrl}
                alt={item?.product?.title}
              />
            ))}
          </AvatarGroup>

          <div className="max-w-[200px] truncate">
            {order?.orderItems?.map((item) => (
              <div
                key={item.id}
                className="text-gray-800 text-sm font-medium truncate"
              >
                {item?.product?.title}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Status Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          {/* Payment Status */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium">Payment:</span>
            <span
              className={`px-3 py-1 rounded-md text-xs font-semibold ${
                order.paymentDetails.paymentStatus === "PENDING"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {order.paymentDetails.paymentStatus}
            </span>
          </div>

          {/* Order Status */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium">Status:</span>
            <span
              className={`px-3 py-1 rounded-md text-xs font-semibold ${
                order.orderStatus === "PENDING"
                  ? "bg-red-100 text-red-600"
                  : order.orderStatus === "SHIPPED"
                  ? "bg-blue-100 text-blue-600"
                  : order.orderStatus === "CONFIRMED"
                  ? "bg-green-100 text-green-600"
                  : order.orderStatus === "PLACED"
                  ? "bg-gray-100 text-gray-600"
                  : ""
              }`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestOrder;

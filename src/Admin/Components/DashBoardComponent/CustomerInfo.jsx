import React from "react";
import Avatar from "@mui/material/Avatar";

function CustomerInfo({ customer }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 mb-3 flex items-center justify-between flex-wrap gap-4">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        <Avatar
          sx={{ bgcolor: "primary.main" }}
          className="!w-12 !h-12 font-bold text-lg"
        >
          {customer.firstname?.charAt(0).toUpperCase() || "?"}
        </Avatar>
        <div>
          <p className="text-gray-900 font-semibold text-lg">
            {customer.firstname} {customer.lastname}
          </p>
          <p className="text-sm text-gray-500">Customer</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 text-sm text-gray-600">
        <div>
          <p className="font-medium text-gray-700">📱 Mobile</p>
          <p>{customer.mobile}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">✉️ Email</p>
          <p className="truncate max-w-[200px] sm:max-w-[300px]">
            {customer.email}
          </p>
        </div>
      </div>

      {/* Action buttons (optional) */}
      
    </div>
  );
}

export default CustomerInfo;

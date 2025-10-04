import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancleOrder,
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getadminOrders,
  shipOrder,
} from "../../State/AdminOrders/Action";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

function OrderTable() {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState([]);

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  useEffect(() => {
    dispatch(getadminOrders());
  }, [
    adminOrder.confirmed,
    adminOrder.ship,
    adminOrder.delivered,
    adminOrder.cancle,
    adminOrder.delete,
    dispatch,
  ]);

  const handleAction = (action, orderId, index) => {
    dispatch(action(orderId));
    handleClose(index);
  };

  return (
    <div className="p-4 lg:p-8  h-full overflow-y-scroll">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📦 All Orders</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left text-gray-700">
          {/* Table Header */}
          <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
            <tr>
              {[
                "Order ID",
                "Image",
                "Title",
                "Price",
                "Payment Status",
                "Payment Id",
                "Order Status",
                "Order Date",
                "Delivery Date",
                "Total Items",
                "Address",
                "Change Status",
                "Delete",
              ].map((head, i) => (
                <th
                  key={i}
                  className="px-6 py-4 font-semibold tracking-wide whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {adminOrder.orders?.length === 0 ? (
              <tr>
                <td
                  colSpan={13}
                  className="text-center py-8 text-gray-500 italic"
                >
                  🚫 No orders found
                </td>
              </tr>
            ) : (
              adminOrder.orders?.map((row, index) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  {/* Order ID */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{row.id}
                  </td>

                  {/* Product Images */}
                  <td className="px-6 py-4">
                    <AvatarGroup max={3}>
                      {row?.orderItems?.map((item) => (
                        <Avatar
                          key={item.id}
                          src={item?.product?.imageUrl}
                          alt={item?.product?.title}
                        />
                      ))}
                    </AvatarGroup>
                  </td>

                  {/* Titles */}
                  <td className="px-6 py-4 max-w-[180px] truncate">
                    {row?.orderItems?.map((item) => (
                      <div key={item.id} className="text-gray-700">
                        {item?.product?.title}
                      </div>
                    ))}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-bold text-green-600">
                    ₹{row.totalDiscountedPrice}
                  </td>

                  {/* Payment Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        row.paymentDetails.paymentStatus === "PENDING"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {row.paymentDetails.paymentStatus}
                    </span>
                  </td>

                  {/* Payment ID */}
                  <td className="px-6 py-4">{row.paymentDetails.paymentId}</td>

                  {/* Order Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        row.orderStatus === "PENDING"
                          ? "bg-red-100 text-red-600"
                          : row.orderStatus === "SHIPPED"
                          ? "bg-blue-100 text-blue-600"
                          : row.orderStatus === "CONFIRMED"
                          ? "bg-green-100 text-green-600"
                          : row.orderStatus === "PLACED"
                          ? "bg-gray-100 text-gray-600"
                          : ""
                      }`}
                    >
                      {row.orderStatus}
                    </span>
                  </td>

                  {/* Dates */}
                  <td className="px-6 py-4 text-gray-600">{row.orderDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        row.deliveryDate
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {row.deliveryDate || "Not Delivered"}
                    </span>
                  </td>

                  {/* Items */}
                  <td className="px-6 py-4">{row.totalItem}</td>

                  {/* Address */}
                  <td className="px-6 py-4 text-sm">
                    <div className="font-semibold">
                      {row.shippingAddress.firstname}{" "}
                      {row.shippingAddress.lastname}
                    </div>
                    <div>{row.shippingAddress.mobile}</div>
                    <div className="text-gray-500">
                      {row.shippingAddress.streetAddress},{" "}
                      {row.shippingAddress.city}, {row.shippingAddress.state},{" "}
                      {row.shippingAddress.zipCode}
                    </div>
                  </td>

                  {/* Change Status */}
                  <td className="px-6 py-4">
                    <button
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs"
                      onClick={(event) => handleClick(event, index)}
                    >
                      Change
                    </button>
                    <Menu
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => handleClose(index)}
                    >
                      <MenuItem
                        onClick={() =>
                          handleAction(confirmOrder, row.id, index)
                        }
                      >
                        Confirm
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleAction(shipOrder, row.id, index)}
                      >
                        Ship
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleAction(deliveredOrder, row.id, index)
                        }
                      >
                        Deliver
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleAction(cancleOrder, row.id, index)}
                      >
                        Cancel
                      </MenuItem>
                    </Menu>
                  </td>

                  {/* Delete */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => dispatch(deleteOrder(row.id))}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;

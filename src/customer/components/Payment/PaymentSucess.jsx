import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Store } from "./../../../State/Store";
import { getOrderById } from "../../../State/Order/Action";
import { updatePayment } from "../../../State/Payment/Action";
import OrderTracker from "../Order/OrderTracker";
import OrderCard from "../Order/OrderCard";
import AddressCard from "../AddressCard/AddressCard";
import { CheckCircle } from "lucide-react";

function PaymentSuccess() {
  const [paymentId, setPaymentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((Store) => Store);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    const paymentId = urlParam.get("razorpay_payment_id");
    const paymentStatus = urlParam.get("razorpay_payment_link_status");
    setPaymentId(paymentId);
    setPaymentStatus(paymentStatus);
  }, []);

  useEffect(() => {
    if (paymentId && orderId) {
      const data = { paymentId, orderId };
      dispatch(getOrderById(orderId));
      dispatch(updatePayment(data));
    }
  }, [paymentId, orderId, dispatch]);

  return (
    <div className="px-4 lg:px-24 py-10 bg-gray-50 min-h-screen">
      {/* Success Banner */}
      <div className="flex flex-col justify-center items-center mb-10 text-center">
        <CheckCircle className="w-16 h-16 text-green-600" />
        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-green-700">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-600 mt-2">
          Congratulations! Your order has been placed successfully.
        </p>
      </div>

      {/* Order Tracker */}
      <div className="my-8">
        <OrderTracker activeStep={1} />
      </div>



      {/* Order Items Section */}
      <div className="mt-12 space-y-6 ">
        {order?.order?.orderItems?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row  justify-between bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition"
          >
            {/* Product Info */}
            <div className="flex items-start space-x-4">
              <img
                src={item?.product?.imageUrl}
                alt="Order Item"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold text-lg text-gray-800 w-[250px] truncate">
                  {item?.product?.title}
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Size: {item?.size}</p>
                  <p>Color: {item?.product?.color}</p>
                  <p>Quantity: {item?.quantity}</p>
                </div>
                <p className="mt-1 text-gray-700">
                  Seller:{" "}
                  <span className="font-medium">{item?.product?.brand}</span>
                </p>
                <p className="font-bold text-green-600 mt-1">₹{item?.discountedPrice}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-6 md:mt-0 md:w-1/3  p-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                Shipping Address
              </h3>
              <AddressCard address={order?.order?.shippingAddress} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-600 text-sm mt-10">
        Need help?{" "}
        <span className="text-blue-600 font-medium cursor-pointer hover:underline">
          Contact Support
        </span>
        .
      </div>
    </div>
  );
}

export default PaymentSuccess;

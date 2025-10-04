import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { getUser } from "../../../State/Auth/Action";

function Adddeliveryaddress() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {order,auth}=useSelector(Store=>Store);
 const location=useLocation();
  const handleSubmit = (e) => {
   
    e.preventDefault();
   
    const formData = new FormData(e.currentTarget);

    console.log("Form Data:", {
       firstname: formData.get("firstName"),
      lastname: formData.get("lastName"),
      streetAddress: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("pincode"),
      mobile: formData.get("phonenumber"),
 
    });
    const address={
         firstname: formData.get("firstName"),
      lastname: formData.get("lastName"),
      streetAddress: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("pincode"),
      mobile: formData.get("phonenumber"),
    }

    navigate("/cart/checkout?step=2");
    const orderData={
        address,navigate
    }
    dispatch(createOrder(orderData));
  };
  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(getUser());
    }
  },[]);
  console.log("order",order)

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Saved Addresses */}
        <div className="lg:col-span-5 border rounded-lg shadow-md h-[30.5rem] overflow-y-auto bg-white">
          <form className="p-5 border-b">
            {/* Replace with your reusable address card */}
          { auth?.user?.address?.map((address) => <>
          <AddressCard address={address} />
          <hr className="border-2xl mb-10 mt-10"/>


          </>
          )}
             
          </form>
        </div>

        {/* New Address Form */}
        <div className="lg:col-span-7 border rounded-lg shadow-md bg-white p-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-3 py-2"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-3 py-2"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <textarea
                name="address"
                id="address"
                rows={3}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-3 py-2"
              ></textarea>
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-3 py-2"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-3 py-2"
                />
              </div>
            </div>

            {/* Pincode & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Postal Code / Zip
                </label>
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-3 py-2"
                />
              </div>

              <div>
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phonenumber"
                  id="phonenumber"
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-3 py-2"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition duration-200"
            >
              Deliver Here
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Adddeliveryaddress;

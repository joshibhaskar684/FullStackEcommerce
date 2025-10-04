import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  clearAuthMessage, register } from '../../State/Auth/Action';

function RegisterForm() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const{auth}=useSelector(Store=>Store);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const data=new FormData(e.currentTarget);
    const userData = {
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      mobile: data.get('mobileno'),
      // Add other form data as needed
    }
    dispatch(register(userData));
    
    
  };
  useEffect(() => {
  if (auth.message) {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1000);

    return () => clearTimeout(timer);
  }
}, [auth.message, navigate]);
 

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className=' py-1 flex space-x-2 items-center justify-center pb-10'><h1 className='text-4xl font-bold'>Sign Up</h1> </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-4  md:px-0">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  ">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              required
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              required
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            required
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            required
            id="mobileno"
            name="mobileno"
            type="number"
            autoComplete="NUMBER"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-md text-lg font-semibold hover:bg-purple-700 transition"
          >
            Register
          </button>
        </div>
            </form>
      <div className='text-center pt-5 flex space-x-2 items-center justify-center'><p>If you already have an account ?</p> <button className='text-purple-600 underline' onClick={()=>navigate("/login")}>login.</button></div>
    </div>
  );
}

export default RegisterForm;

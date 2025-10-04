import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAuthMessage, getUser, login } from '../../State/Auth/Action';

function LoginForm() {
    const {auth}=useSelector(Store=>Store);
    const navigate=useNavigate();
    const dispatch = useDispatch();

  useEffect(() => {
  if (auth.loginmessage) {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);
    return () => clearTimeout(timer);
  }
}, [auth.loginmessage]);





  const token=localStorage.getItem("token");
  
    useEffect(()=>{
           if(token)
           dispatch(getUser());
       },[token,auth.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const data=new FormData(e.currentTarget);
    const userData = {
     
      email: data.get('email'),
      password: data.get('password'),
      // Add other form data as needed
    }
  dispatch(login(userData));

    console.log(userData);
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
        <div className=' py-1 pb-10 flex space-x-2 items-center justify-center'><h1 className='text-4xl font-bold'>Log In</h1> </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-4  md:px-0">
    

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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-md text-lg font-semibold hover:bg-purple-700 transition"
          >
            Login
          </button>
        </div>
        
      </form>
         <div className='text-center pt-5 flex space-x-2 items-center justify-center'>
            <p>If you don't have an account ?</p>
             <button className='text-purple-600 underline' onClick={()=>navigate("/register")}>Register.</button></div>
  
    </div>
  );
}

export default LoginForm;

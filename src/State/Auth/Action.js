import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { useNavigate } from "react-router-dom";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { toast } from 'react-toastify';





// ✅ Action Creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (message) => ({ type: REGISTER_SUCCESS, message });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
  message: user.message,
});
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

const logout = () => ({ type: LOGOUT });

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });


// ✅ Async Actions

// Register
export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    dispatch(registerSuccess(response.data));
    toast.success("✅ User Registered Successfully!");
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(registerFailure(errorMessage));
    toast.error(errorMessage);
  }
};


// Login
export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    const user = response.data;
console.log("login action ",user);  
    if (user.token) {
      localStorage.setItem("token", user.token);
    }

    dispatch(loginSuccess(user));
      toast.success("✅ User Login Successfully!");
     

  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Login failed. Please try again.";
    dispatch(loginFailure(errorMessage));
    toast.error(errorMessage);
  }
};


// ✅ Get User – Only if token exists
export const getUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found. Skipping getUser request.");
    return;
  }

  dispatch(getUserRequest());
  
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getUserSuccess(response.data));
    console.log("get user action ",response.data);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(getUserFailure(errorMessage));
  }
};


// Logout
export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  dispatch(logout());
  toast.success("✅ User Logout Successfully!");
};












// const registerRequest=()=>({
//     type:"REGISTER_REQUEST"
// });
// const registerSuccess=(message)=>({
//     type:"REGISTER_SUCCESS",
//    message:message
// })
// const registerFailure=(error)=>({
//     type:"REGISTER_FAILURE",
//     payload:error
// })
// const loginRequest=()=>({
//     type:"LOGIN_REQUEST"
// });
// const loginSuccess=(user)=>({
//     type:"LOGIN_SUCCESS",
//     payload:user,
//     message:user.message
// })
// const loginFailure=(error)=>({
//     type:"LOGIN_FAILURE",
//     payload:error
    
// })
// const logout=()=>({
//     type:"LOGOUT",
//     payload:null
// })
// const getUserRequest=()=>({
//     type:"GET_USER_REQUEST"
// });
// const getUserSuccess=(user)=>({
//     type:"GET_USER_SUCCESS",
//     payload:user
// })
// const getUserFailure=(error)=>({
//     type:"GET_USER_FAILURE",
//     payload:error
// })
// export const register=(userData)=>async(dispatch)=>{
//     dispatch(registerRequest());
//     try{
//         console.log(userData);  
//         const response=await axios.post(`${API_BASE_URL}/auth/signup`,userData);
//    console.log(response.data+" at function");
   
//     dispatch(registerSuccess(response.data));
//     }catch(error){
//        dispatch(registerFailure(error.message));
//     }   
   
// }
// export const clearAuth = () => ({
//   type: "CLEAR_AUTH",
// });

// export const clearAuthMessage = () => ({
//   type: "CLEAR_AUTH_MESSAGE",

// });


// export const login=(userData)=>async(dispatch)=>{
//     dispatch(loginRequest());
//     try{
//         const response=await axios.post(`${API_BASE_URL}/auth/login`,userData);
//     const user=response.data;
//     if(user.token){
//         localStorage.setItem("token",user.token);
//     }  
//     dispatch(loginSuccess(user));
//     }catch(error){
//          const errorMessage =
//       error.response?.data?.message || "Login failed. Please try again.";
      
//        dispatch(loginFailure(errorMessage));
//     }   
   
// }
// export const getUser=()=>async(dispatch)=>{
//     dispatch(getUserRequest());
//     try{
//         const response=await axios.get(`${API_BASE_URL}/api/users/profile`,{
//             headers:{
//                 "Authorization":`Bearer ${localStorage.getItem("token")}`
//             }
//         });
//     const user=response.data;
    
//     dispatch(getUserSuccess(user));
//     }catch(error){
//        dispatch(getUserFailure(error.message));
//     }
// }
// export const logoutUser=()=>async(dispatch)=>{
//     localStorage.clear();
//     dispatch(logout());
// }
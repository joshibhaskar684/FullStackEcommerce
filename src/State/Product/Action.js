import axios from "axios";
import { api, API_BASE_URL} from "../../config/apiConfig";

import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_U_PRODUCTS_SUCCESS, FIND_USER_PRODUCTS_FAILURE, FIND_USER_PRODUCTS_REQUEST, FIND_USER_PRODUCTS_SUCCESS } from "./ActionType";



export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  const{
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNo,
    pageSize,
  }=reqData;
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNo=${pageNo}&pageSize=${pageSize}`);
    console.log("data at reducer",data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};
export const getAllProducts=()=>async(dispatch)=>{
    dispatch({type:FIND_PRODUCTS_REQUEST})
    try{
        const {data}=await api.get(`/api/get/products`);
        dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type:FIND_PRODUCTS_FAILURE,payload:error.message})
    
    }
}
export const findProductById=(reqData)=>async(dispatch)=>{
    dispatch({type:FIND_PRODUCT_BY_ID_REQUEST})
    const{productId}=reqData;
    try{
        // const {data}= await axios.get(`${API_BASE_URL}/api/products/id/${productId}`);
        const{data}=await axios.get(`${API_BASE_URL}/api/products/id/${productId}`);
        console.log("data at reducer",data);
        dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:error.message})
    
    }
}

// export const createProduct=(product)=>async(dispatch)=>{
//     try{
//         dispatch({type:CREATE_PRODUCT_REQUEST})

//         const {data}=await axios.post(`${API_BASE_URL}/api/admin/createproduct`,product);
//         console.log(data);
//               dispatch({type:CREATE_PRODUCT_SUCCESS,payload:data})

//     }
//     catch(error){
//         dispatch({type:CREATE_PRODUCT_FAILURE,payload:error.message})
       
//     }


// }

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { data } = await api.post("/api/admin/createproduct", product);
    console.log("create success", data);

    if (!data.success) {
      throw new Error(data.message);
    }

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });

    throw new Error(error.response?.data?.message || error.message);
  }
};



export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const response = await api.delete(`/api/admin/deleteproduct/${productId}`);
    
    
    const data = response?.data || {};

    if (!data.success) {
      throw new Error(data.message || "Unknown error from server");
    }

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: {
        productId,
        message: data.message,
      },
    });
  } catch (error) {
    const errMsg =
      error.response?.data?.message || error.message;

    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: errMsg,
    });

    throw new Error(errMsg);
  }
};


// export const deleteProduct = (productId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_PRODUCT_REQUEST });


//    const {data}= await api.delete(`/api/admin/deleteproduct/${productId}`);
//    console.log("deletes ",data);
//     // Check the success field
//     if (!data.success) {
//       throw new Error(data.message);
//     }

//     dispatch({
//       type: DELETE_PRODUCT_SUCCESS,
//       payload: {
//         productId,
//         message:data.message,
//       },
//     });
//   } catch (error) {
//     const errMsg =
//       error.response && error.response.data && error.response.data.message
//         ? error.response.data.message
//         : error.message;

//     dispatch({
//       type: DELETE_PRODUCT_FAILURE,
//       payload: errMsg,
//     });

//     throw new Error(errMsg);
//     // Optionally throw to handle in component
   
//   }
// };

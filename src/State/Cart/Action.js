import { toast } from "react-toastify";
import { api } from "../../config/apiConfig";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType";


export const getCart=()=>async(dispatch)=>{
    dispatch({type:GET_CART_REQUEST});
    try{
        const {data}=await api.get(`/api/cart/user`);
        console.log("cart ",data)
        dispatch({type:GET_CART_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type:GET_CART_FAILURE,payload:error.message})
    }
}
export const addItemtocart=(reqdata)=>async(dispatch)=>{
    dispatch({type:ADD_ITEM_TO_CART_REQUEST});
    
    try{
        const {data}=await api.put(`/api/cart/add`,reqdata);
        console.log("cart ",data);
        dispatch({type:ADD_ITEM_TO_CART_SUCCESS,payload:data})
        getCart();
        toast.success("Item added to cart");
    }
        catch(error){
            dispatch({type:ADD_ITEM_TO_CART_FAILURE,payload:error.message})
            toast.error(error.message);
        }
}
export const RemoveCartItem=(reqdata)=>async(dispatch)=>{
    dispatch({type:REMOVE_CART_ITEM_REQUEST});
    
    try{
        const {data}=await api.delete(`/api/cart/delete/${reqdata}`);
        
        dispatch({type:REMOVE_CART_ITEM_SUCCESS,payload:data})
        toast.success("Item Removed From cart");
        dispatch(getCart());
    }
        catch(error){
            dispatch({type:REMOVE_CART_ITEM_FAILURE,payload:error.message})
             toast.error(error.message);
        }
}

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });

  try {
    console.log(
      "reqdata in action quantity",
      reqData.cartItem?.quantity,
      reqData.cartItemId
    );

    const { data } = await api.put(
      `/api/cartitem/update/${reqData.cartItemId}`,
      reqData.cartItem // ✅ not reqData.data
    );

    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
    dispatch(getCart());
    toast.success("Cart Updated Successfully");
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
    toast.error(error.message);
  }
};


import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,GET_ORDER_BY_ID_FAILURE,GET_ORDER_BY_ID_REQUEST,GET_ORDER_BY_ID_SUCCESS,GET_ORDER_HISTORY_FAILURE,GET_ORDER_HISTORY_REQUEST,GET_ORDER_HISTORY_SUCCESS } from "./ActionType";

import { api } from "../../config/apiConfig";
import { toast } from "react-toastify";
 export const createOrder=(reqData)=>async(dispatch)=>{
    dispatch({type:CREATE_ORDER_REQUEST});
    
    try{
        const {data}=await api.post(`/api/orders/create`,reqData.address);
        if(data.id){
            reqData.navigate({search:`step=2&order_id=${data.id}`})
        }
        console.log("order ",data)
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
        toast.success("Order Address Added Successfully");
    }
        catch(error){
            dispatch({type:CREATE_ORDER_FAILURE,payload:error.message})
            toast.error(error.message);
        }
 }

 export const getOrderById=(orderId)=>async(dispatch)=>{
    dispatch({type:GET_ORDER_BY_ID_REQUEST});
    
    try{
        const {data}=await api.get(`/api/orders/find/${orderId}`);
        
        dispatch({type:GET_ORDER_BY_ID_SUCCESS,payload:data})
    console.log("order by id ",data)
    }
        catch(error){
            dispatch({type:GET_ORDER_BY_ID_FAILURE,payload:error.message})
        }
 }
 
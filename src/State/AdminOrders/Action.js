import { useDispatch } from "react-redux";
import { api } from "../../config/apiConfig";
import { toast } from 'react-toastify';
import { CANCELED_ORDER_FAILURE,

     CANCELED_ORDER_REQUEST,
      CANCELED_ORDER_SUCCESS,
       CONFIRMED_ORDER_FAILURE,
        CONFIRMED_ORDER_REQUEST, 
        CONFIRMED_ORDER_SUCCESS,
         DELETE_ORDER_FAILURE,
          DELETE_ORDER_REQUEST, 
          DELETE_ORDER_SUCCESS,
           DELIVERED_ORDER_FAILURE,
            DELIVERED_ORDER_REQUEST,
             DELIVERED_ORDER_SUCCESS, 
             GET_ORDERS_FAILURE, 
             GET_ORDERS_REQUEST,
              GET_ORDERS_SUCCESS, 
              SHIP_ORDER_FAILURE,
               SHIP_ORDER_REQUEST, 
               SHIP_ORDER_SUCCESS } from "./ActionType";


export const getadminOrders=()=>{
    return async(dispatch)=>{
        dispatch({type:GET_ORDERS_REQUEST});
        try{
            const {data}=await api.get(`/api/admin/orders/get`);
            dispatch({type:GET_ORDERS_SUCCESS,payload:data})
            console.log("orders admin",data);
        }
        catch(error){
            dispatch({type:GET_ORDERS_FAILURE,error:error.message})
        }
    }
}

export const confirmOrder=(orderId)=>{
    return async(dispatch)=>{
        dispatch({type:CONFIRMED_ORDER_REQUEST});
        try{
            const {data}=await api.put(`/api/admin/orders/${orderId}/confirmed`);
        
            dispatch({type:CONFIRMED_ORDER_SUCCESS,payload:data})
       
            toast.success("Order Confirmed Successfully Order Id "+orderId);
        }
        catch(error){
            dispatch({type:CONFIRMED_ORDER_FAILURE,payload:error.message})
            toast.error("Error in Confirming Order "+error.message);
        }
    }
}


export const shipOrder=(orderId)=>{
    return async(dispatch)=>{
        dispatch({type:SHIP_ORDER_REQUEST});
        try{
            const {data}=await api.put(`/api/admin/orders/${orderId}/ship`);
            dispatch({type:SHIP_ORDER_SUCCESS,payload:data})
        
        toast.success("Order Shipped Successfully Order Id "+orderId);
    }
        catch(error){
            dispatch({type:SHIP_ORDER_FAILURE,payload:error.message})
            toast.error("Error in Shipping Order "+error.message);
        }
    }
}

export const deliveredOrder=(orderId)=>{
    return async(dispatch)=>{
        dispatch({type:DELIVERED_ORDER_REQUEST});
        try{
            const {data}=await api.put(`/api/admin/orders/${orderId}/deliver`);
            dispatch({type:DELIVERED_ORDER_SUCCESS,payload:data})
            toast.success("Order Delivered Successfully Order Id "+orderId);
        
        }
        catch(error){
            dispatch({type:DELIVERED_ORDER_FAILURE,payload:error.message})
            toast.error("Error in Delivering Order "+error.message);
        }
    }
}

export const cancleOrder=(orderId)=>async(dispatch)=>{
    
        dispatch({type:CANCELED_ORDER_REQUEST});
        try{
            const {data}=await api.put(`/api/admin/orders/${orderId}/cancel`);
            dispatch({type:CANCELED_ORDER_SUCCESS,payload:data})
         toast.success("Order Canceled Successfully Order Id "+orderId);
        }
        catch(error){
            dispatch({type:CANCELED_ORDER_FAILURE,payload:error.message})
            toast.error("Error in Canceling Order "+error.message);
        }
    }


export const deleteOrder=(orderId)=>async(dispatch)=>{
    
        dispatch({type:DELETE_ORDER_REQUEST});
        try{
            const {data}=await api.delete(`/api/admin/orders/${orderId}/delete`);
       
            dispatch({type:DELETE_ORDER_SUCCESS,payload:data})
            toast.success("Order Deleted Successfully Order Id "+orderId);

        }
        catch(error){
            dispatch({type:DELETE_ORDER_FAILURE,payload:error.message})
            toast.error("Error in Deleting Order "+error.message);
        }
            }

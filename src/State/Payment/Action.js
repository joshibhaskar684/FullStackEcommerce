import { toast } from "react-toastify";
import { api } from "../../config/apiConfig";


export const createPayment=(orderId)=>async(dispatch)=>{
   dispatch({type:"CREATE_PAYMENT_REQUEST"});
    try{
        const {data}=await api.post(`/api/payments/${orderId}`,{});
        
        console.log("createpaymnt ",data);
        if(data.payment_link_url){
            window.location.href=data.payment_link_url;
        }
        dispatch({type:"CREATE_PAYMENT_SUCCESS",payload:data});
   
        toast.success("Payment Initiated Successfully");
               toast.info("Redirecting to Payment Page...");
    }
catch(error){  
    dispatch({type:"CREATE_PAYMENT_FAIL",payload:error.message});

    toast.error("Failed to initiate payment. Please try again.");
    console.log(error);
}
}
export const updatePayment=(reqData)=>async(dispatch)=>{
    dispatch({type:"UPDATE_PAYMENT_REQUEST"});
    try{
       const { data } = await api.get(
  `/api/payments?razorpay_payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`
);

      
     console.log("updatepaymnt ",data);
     
        dispatch({type:"UPDATE_PAYMENT_SUCCESS",payload:data});
        toast.success("Order Placed Successfully");
    

    
    }
catch(error){  
    dispatch({type:"UPDATE_PAYMENT_FAIL",payload:error.message});

    console.log(error);
}
}
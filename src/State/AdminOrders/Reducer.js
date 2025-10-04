
import { api } from "../../config/apiConfig";
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


const initialState={
    loading:false,
    orders:[],
    error:"",
    confirmed:[],
    ship:[],
    delivered:[],
    cancle:[],
    delete:[]
    

}

 export const adminOrderReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_ORDERS_REQUEST:
            return {...state,loading:true}
        case GET_ORDERS_SUCCESS:
            return {...state,loading:false,orders:action.payload}
        case GET_ORDERS_FAILURE:
            return {...state,loading:false,error:action.payload}
        case CONFIRMED_ORDER_REQUEST:
            return {...state,loading:true}
        case CONFIRMED_ORDER_SUCCESS:
            return {...state,loading:false,confirmed:action.payload}
        case CONFIRMED_ORDER_FAILURE:
            return {...state,loading:false,error:action.payload}
        case DELIVERED_ORDER_REQUEST:
            return {...state,loading:true}
        case DELIVERED_ORDER_SUCCESS:
            return {...state,loading:false,delivered:action.payload}
        case DELIVERED_ORDER_FAILURE:
            return {...state,loading:false,error:action.payload}
        case CANCELED_ORDER_REQUEST:
            return {...state,loading:true}
        case CANCELED_ORDER_SUCCESS:
            return {...state,loading:false,cancle:action.payload}
        case CANCELED_ORDER_FAILURE:
            return {...state,loading:false,error:action.payload}
        case DELETE_ORDER_REQUEST:
            return {...state,loading:true}
        case DELETE_ORDER_SUCCESS:
            return {...state,loading:false,delete:action.payload}
        case DELETE_ORDER_FAILURE:
            return {...state,loading:false,error:action.payload}
        case SHIP_ORDER_REQUEST:
            return {...state,loading:true}
        case SHIP_ORDER_SUCCESS:
            return {...state,loading:false,ship:action.payload}
        case SHIP_ORDER_FAILURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}
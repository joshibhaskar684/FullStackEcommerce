import { FIND_CUSTOMERS_FAILURE, FIND_CUSTOMERS_REQUEST, FIND_CUSTOMERS_SUCCESS } from "./ActionType"

const intitialstate={
    customer:[],
    loading:false,
    error:null,
}

export const adminCustomerReducer=(state=intitialstate,action)=>{
    switch(action.type){
        case FIND_CUSTOMERS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case FIND_CUSTOMERS_SUCCESS:
            return{
                ...state,
                loading:false,
                customer:action.payload,
            }
        case FIND_CUSTOMERS_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        default:
            return state;
    }
}
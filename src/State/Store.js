import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducer";
import { CartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { adminOrderReducer } from "./AdminOrders/Reducer";
import { adminCustomerReducer } from "./AdminCustomer/Reducer";

const rootReducer=combineReducers({
    auth:authReducer,
    productStore:customerProductReducer,
    cart:CartReducer
    ,order:orderReducer,
    adminOrder:adminOrderReducer,
    adminCustomer:adminCustomerReducer
});
export const Store=legacy_createStore(rootReducer,applyMiddleware(thunk));

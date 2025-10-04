import { api } from "../../config/apiConfig";
import { FIND_CUSTOMERS_FAILURE, FIND_CUSTOMERS_REQUEST, FIND_CUSTOMERS_SUCCESS } from "./ActionType";

export const getCustomers = () => async (dispatch) => {
  
    dispatch({ type: FIND_CUSTOMERS_REQUEST });
    try {
      const { data } = await api.get(`/api/users/allCustomer`);
      console.log("data at reducer of customer", data);
      dispatch({ type: FIND_CUSTOMERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FIND_CUSTOMERS_FAILURE, payload: error.message });
    }
  };    

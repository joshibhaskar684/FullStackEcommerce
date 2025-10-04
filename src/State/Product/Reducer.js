import { deleteProduct } from "./Action"
import { FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_USER_PRODUCTS_REQUEST, FIND_USER_PRODUCTS_SUCCESS, FIND_USER_PRODUCTS_FAILURE } from "./ActionType"
const initialState = {
    products: [],
    product: [],
    loading: false,
    error: null
}

export const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null }
        case FIND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload }
        case FIND_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // case FIND_USER_PRODUCTS_REQUEST:
        //     return { ...state, loading: true, error: null }
        // case FIND_USER_PRODUCTS_SUCCESS:
        //     return { ...state, loading: false, error: null, userproducts: action.payload }
        // case FIND_USER_PRODUCTS_FAILURE:
        //     return { ...state, loading: false, error: action.payload }


        case FIND_PRODUCT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null }
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload }
        case FIND_PRODUCT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case CREATE_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case CREATE_PRODUCT_SUCCESS:
            return { ...state, loading: false, product: action.payload }
        case CREATE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null }
        case DELETE_PRODUCT_SUCCESS:
            return { ...state, loading: false, error: null, deletedProduct: action.payload }

        case DELETE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }

}
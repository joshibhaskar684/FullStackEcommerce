
const initialState = {
    isLoading: false,
    user: null,
    error: null,
    token: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
                message: action.message
            }
        case "REGISTER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "LOGIN_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            }
        
        
            

        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
                token: action.token,
                loginmessage: action.message,
                loginfailmessage: null  // clear fail message if previously set
            };

        case "LOGIN_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
                token: null,
                loginmessage: null,
                loginfailmessage: action.payload
            };

        case "LOGOUT":
            return {
                ...initialState
            }
        case "GET_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "GET_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload
            }
        case "GET_USER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
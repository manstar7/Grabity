import {
    SET_CURRENT_USER,
    USER_ADD,
    FORM_ADD,
    POOL_ADD,
    STAKE_ADD,
    WAPPER_ADD,
    TOKEN_ADD,
    FORM_UPDATE,
    POOL_UPDATE,
    STAKE_UPDATE,
    WAPPER_UPDATE,
    
    USER_UPDATE,
    USER_LOADING,
    FORM_LOADING,
    STAKE_LOADING,
    WAPPER_LOADING,
    TOKEN_LOADING,
   
   
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
};
export default function(state = initialState, action) {
    switch (action.type) {
        case USER_ADD:
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_UPDATE:
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case FORM_ADD:
            return {
                isAuthenticated: !isEmpty(action.payload),
                form: action.payload
            };
        case FORM_UPDATE:
            return {
                isAuthenticated: !isEmpty(action.payload),
                form: action.payload,
            };
        case STAKE_ADD:
            return {
                isAuthenticated: !isEmpty(action.payload),
                form: action.payload
            };
        case STAKE_UPDATE:
            return {
                isAuthenticated: !isEmpty(action.payload),
                form: action.payload,
            };
            case WAPPER_ADD:
            return {
                isAuthenticated: !isEmpty(action.payload),
                form: action.payload
            };
        case WAPPER_UPDATE:
            return {
                isAuthenticated: !isEmpty(action.payload),
                form: action.payload,
            };
        case POOL_ADD:
                return {
                    isAuthenticated: !isEmpty(action.payload),
                    form: action.payload
                };
        case POOL_UPDATE:
                return {
                    isAuthenticated: !isEmpty(action.payload),
                    form: action.payload,
                };  
        case TOKEN_ADD:
                return {
                    isAuthenticated: !isEmpty(action.payload),
                    form: action.payload
                };
         
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
            case FORM_LOADING:
            return {
                ...state,
                loading: true
            };
            case STAKE_LOADING:
            return {
                ...state,
                loading: true
            };
            case WAPPER_LOADING:
            return {
                ...state,
                loading: true
            };
            case TOKEN_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

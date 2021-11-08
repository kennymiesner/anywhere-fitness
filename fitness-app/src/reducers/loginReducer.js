import { LOGIN, LOGOUT, SET_EMAIL } from "../actions/loginActions";

let initialState = {
    isLogin: false,
    role: null,
    email: null,
}

if (localStorage.getItem("token")) {
    initialState = {
        isLogin: true
    }
}


export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLogin: true,
                role: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isLogin: action.payload,
                role: null,
            }
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload,
            }
        default:
            return state;
    };
}

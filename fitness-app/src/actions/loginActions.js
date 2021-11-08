export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_EMAIL = 'SET_EMAIL';

export const login = (role) => {
    return ({ type: LOGIN, payload: role });
}

export const logout = () => {
    return ({ type: LOGOUT, payload: false });
}

export const setEmail = (email) => {
    return ({ type: SET_EMAIL, payload: email });
}
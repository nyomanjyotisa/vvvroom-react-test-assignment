import axiosInstance from "../mockAPI/api";

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (email, password) => {
    return async (dispatch) => {
        await axiosInstance.post('/login', {
            email,
            password,
        });

        dispatch({
            type: LOGIN,
        });
    };
};

export const logout = () => {
    return async (dispatch) => {
        await axiosInstance.post('/logout')

        dispatch({
            type: LOGOUT,
        });
    };
}

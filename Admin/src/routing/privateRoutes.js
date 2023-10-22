import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(
        localStorage.getItem("user")
    );
    // console.log(getTokenFromLocalStorage.token);

    return getTokenFromLocalStorage?.token !== undefined ? ( // when token is not defing use '?'
        children
    ) : (
        <Navigate
            to="/"
            replace={true}
        />
    );
};
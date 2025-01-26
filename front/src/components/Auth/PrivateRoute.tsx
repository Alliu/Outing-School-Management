import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../contexts/user.context";
import React from "react";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    console.log(user.isLogged);

    if (user.isLogged === false) {
        return (
            <Navigate
                to="/signin
        "
            />
        );
    }
    return children;
};

export default PrivateRoute;

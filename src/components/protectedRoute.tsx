import { useSelector } from "react-redux";
import { ProtectedRouteParams, State } from "../types/types";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import MenuComponent from "./menu";

function ProtectedRoute({ children }: ProtectedRouteParams) {
    const token = useSelector((state: State) => state.user.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate("/signin");
    }, [token, navigate])

    const menu = (
        <>
            <div className="fixed top-0 left-0 p-4"><MenuComponent /></div>
            {children}
        </>
    )

    return token ? menu : <Navigate to="signin" replace />
}

export default ProtectedRoute;
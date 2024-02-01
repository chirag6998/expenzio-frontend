import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { State } from "../types/types";

function useAuth(): [string, boolean] {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const token = useSelector((state: State) => {
        return state.user.token;
    })

    useEffect(() => {
        if (token) navigate("/home");
        setLoading(false);
    }, [token])

    return [ token, loading ];
}

export default useAuth;
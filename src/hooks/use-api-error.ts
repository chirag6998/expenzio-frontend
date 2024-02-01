import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERROR_CODES } from "../utilities/constants";
import delay from "delay";
import Cookies from "js-cookie";

function useApiError(): [string, (message: string) => Promise<void>] {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleApiError = async (message: string) => {
        if (message == ERROR_CODES.UNAUTHORIZED) {
            Cookies.remove("Expenzio");
            navigate("/signin");
        } else if (Object.values(ERROR_CODES).includes(message)) {
            setError(message);
            await delay(3000);
            setError("");
        } else {
            setError("Something went wrong");
            await delay(3000);
            setError("");
        }
    }

    return [error, handleApiError];
}

export default useApiError;
import { Button } from "antd";
import { ButtonParams } from "../types/types";
import React from "react";

function ButtonComponent({ children, type, size, ...rest }: ButtonParams) {

    return (
        <Button type={type} size={size} {...rest}>{children}</Button>
    )
}

export default ButtonComponent;
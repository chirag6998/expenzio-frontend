import { Input } from "antd";
import React from "react";
import { InputParams } from "../types/types";

function InputComponent({placeholder, width, type, value, onChange, id, name, onBlur}: InputParams) {

    return (
        <Input type={type} placeholder={placeholder} style={{ width: width }} value={value} onChange={(event) => onChange(event)} id={id} name={name} onBlur={onBlur}/>
    )
}

export default InputComponent;
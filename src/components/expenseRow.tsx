import { Col, Row } from "antd";
import React, { useState } from "react";
import InputComponent from "./input";
import ButtonComponent from "./button";
import { ExpenseParams } from "../types/types";

function ExpenseRow({ name, saveExpense }: ExpenseParams) {

    const [amount, setAmount] = useState<string | number>("");

    const handleChange = (value: string) => {
        setAmount(parseInt(value));
    }

    const handleClick = async () => {
        if (amount != "") {
            await saveExpense(name, amount);
            setAmount("");
        }
    }

    return (
        <div>
            <Row className="pt-5">
                <Col span={5} offset={5} className="pt-2 font-serif">{name}</Col>
                <Col span={5}><InputComponent type="number" placeholder="Amount" width="400" id="amount" name="amount" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)} /></Col>
                <Col span={5} offset={2}><ButtonComponent type="primary" size="small" onClick={handleClick} >SAVE</ButtonComponent></Col>
            </Row>
        </div>
    )
}

export default ExpenseRow;
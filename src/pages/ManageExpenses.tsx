import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Col, Row } from "antd";
import DatePickerComponent from "../components/datePicker";
import InputComponent from "../components/input";
import ButtonComponent from "../components/button";
import CardComponent from "../components/card";
import { useDispatch, useSelector } from "react-redux";
import { DateExpensesMap, FetchExpensesAPI, State } from "../types/types";
import { getDateExpensesMap } from "../utilities/utils";
import moment from "moment";
import { AppDispatch } from "../store";
import fetchExpensesAPI from "../store/thunks/fetchExpenses";
import { updateExpense } from "../store/slices/expenses";

function ManageExpenses() {

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(updateExpense({ totalAmount: 0, expenses: [] }))
    }, [])

    const { totalAmount, expenses, token } = useSelector((state: State) => {
        return {
            token: state.user.token,
            totalAmount: state.expenses.totalAmount,
            expenses: state.expenses.expenses
        }
    })

    const [tag, setTag] = useState("");
    const [dates, setDates] = useState<any>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTag(event.target.value);
    }

    const handleFind = async () => {
        if (dates != null && dates.length == 2) {
            const startDate = moment(dates[0]["$d"]).format("YYYY-MM-DD")
            const endDate = moment(dates[1]["$d"]).format("YYYY-MM-DD")
            let paramsForExpensesAPI: FetchExpensesAPI = { startDate, endDate, token };
            await dispatch(fetchExpensesAPI(paramsForExpensesAPI))
        }
    }

    let renderCards: React.JSX.Element[] = [];

    let dateExpensesMap: DateExpensesMap = new Map();
    if (expenses && expenses.length > 0) {
        dateExpensesMap = getDateExpensesMap(expenses);
        for (let [date, tagAndAmount] of dateExpensesMap) {
            console.log(date, tagAndAmount);
            renderCards.push(<Row key={date}><Col offset={2} className="pt-5"><CardComponent title={date} data={tagAndAmount} /></Col></Row>)
        }
    }

    return (
        <Layout>
            <Row><Col offset={10} className="pb-3"><b>SELECT DATE RANGE</b></Col></Row>
            <Row>
                <Col offset={3}><DatePickerComponent dates={dates} setDates={setDates} /></Col>
                <Col offset={1}><InputComponent type="string" placeholder="Tag" width="400" value={tag} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)} id="tag" name="tag" /></Col>
                <Col offset={1}><ButtonComponent type="primary" size="small" onClick={handleFind}>FIND</ButtonComponent></Col>
            </Row>
            <Row>
                <Col offset={3} className="pt-10"><b>TOTAL - {totalAmount}</b></Col>
            </Row>
            {renderCards}
        </Layout>
    )
}

export default ManageExpenses;
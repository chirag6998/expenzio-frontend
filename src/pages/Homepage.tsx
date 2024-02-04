import { Col, Row } from "antd";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import ExpenseRow from "../components/expenseRow";
import SwitchComponent from "../components/switch";
import Layout from "../components/layout";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import fetchTags from "../store/thunks/fetchTags";
import { FetchExpensesAPI, FetchTagsAPI, State } from "../types/types";
import { AppDispatch } from "../store";
import useApiError from "../hooks/use-api-error";
import AlertComponent from "../components/alert";
import fetchBudget from "../store/thunks/fetchBudget";
import createExpense from "../store/thunks/createExpense";
import fetchExpensesAPI from "../store/thunks/fetchExpenses";

function Homepage() {

    let [checked, setChecked] = useState(false);
    let dispatch: AppDispatch = useDispatch();
    const [error, handleApiError] = useApiError();

    //Fetch monthly expenses in current month
    let startDate = moment().startOf("month").format("YYYY-MM-DD");
    let endDate = moment().endOf("month").format("YYYY-MM-DD");

    let { token, pendingDailyTags, pendingMonthlyTags, budget, totalAmount } = useSelector((state: State) => {
        return {
            token: state.user.token,
            pendingDailyTags: state.setup.dailyPendingTags,
            pendingMonthlyTags: state.setup.monthlyPendingTags,
            budget: state.setup.budget,
            totalAmount: state.expenses.totalAmount
        }
    }, shallowEqual);

    const memoizedSelector = useMemo(() => {
        return {
            token,
            pendingDailyTags,
            pendingMonthlyTags
        };
    }, [token, pendingDailyTags, pendingMonthlyTags]);

    useEffect(() => {
        let params: FetchTagsAPI = {
            token: memoizedSelector.token,
            frequency: "DAILY"
        }
        dispatch(fetchTags(params))
            .unwrap()
            .then(() => console.log("Tags fetched"))
            .catch((exception: any) => console.log(`Exception: ${exception}`))
        dispatch(fetchBudget(memoizedSelector.token))
            .unwrap()
            .then(() => console.log("Budget fetched"))
            .catch((exception) => console.log(`Exception while fetching budget: ${exception}`))

        let paramsForExpensesAPI: FetchExpensesAPI = { startDate, endDate, token };
        dispatch(fetchExpensesAPI(paramsForExpensesAPI))
            .unwrap()
            .then(() => console.log("Expenses fetched"))
            .catch((exception) => console.log(`Exception while fetching expenses: ${exception}`))
    }, [memoizedSelector.token])

    const onSwitch = async (checked: boolean) => {
        if (checked == true) {
            let params: FetchTagsAPI = {
                token: memoizedSelector.token,
                frequency: "MONTHLY"
            }
            let response: any = await dispatch(fetchTags(params))
            if (response.error) await handleApiError(response.error.message)
        }
        setChecked(checked);
    };

    const saveExpense = async (name: string, amount: number) => {
        const response: any = await dispatch(createExpense({ token, tagName: name, amount }));
        if (response.error) {
            await handleApiError(response.error.message);
        } else {
            let params: FetchTagsAPI = {
                token: memoizedSelector.token,
                frequency: "DAILY"
            }
            await dispatch(fetchTags(params));
            params.frequency = "MONTHLY";
            await dispatch(fetchTags(params));
            await dispatch(fetchExpensesAPI({ token, startDate, endDate }))
        }
    }

    let monthlyExpenses = null;

    if (checked == true) monthlyExpenses = pendingMonthlyTags.map((tag) => <ExpenseRow key={tag} name={tag} saveExpense={saveExpense} />)

    const dailyRenderedTags = pendingDailyTags.map((tag: string) => <ExpenseRow key={tag} name={tag} saveExpense={saveExpense} />)

    let renderedMonthlyExpenses = (
        <>
            <Col span={7} offset={7} className="pt-1 font-serif">SHOW MONTHLY EXPENSES</Col>
            <Col span={10}><SwitchComponent onChange={onSwitch} /></Col>
        </>
    )

    if (Array.isArray(monthlyExpenses) && monthlyExpenses.length == 0) {
        renderedMonthlyExpenses = <Col span={8} offset={8} className="pt-1 font-serif">MONTHLY EXPENSES ARE UPDATED!!</Col>
    }

    return (
        <div>
            <Layout>
                {error && <AlertComponent message={error} type="error" />}
                <Row className="pt-10">
                    <Col span={8} offset={2} className="font-serif">Budget: <b>{budget}₹</b></Col>
                    <Col span={6} offset={8} className="font-serif">Spent: <b>{totalAmount}₹</b></Col>
                </Row>
                <Row>
                    <Col span={22} offset={2} className="pt-20 font-serif"><b>{moment().format("DD MMMM")}</b></Col>
                </Row>
                <Row>
                    <Col span={10} offset={8} className="pt-10 font-serif">{dailyRenderedTags.length == 0 ? "DAILY EXPENSES ARE UPDATED!!" : "UPDATE YOUR TODAY'S EXPENSES"}</Col>
                </Row>
                {dailyRenderedTags}
                <Row className="pt-20">
                    {renderedMonthlyExpenses}
                </Row>
                {monthlyExpenses}
            </Layout>
        </div>
    )
}

export default Homepage;
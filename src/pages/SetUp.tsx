import { Col, Row } from "antd";
import React, { useState } from "react";
import InputComponent from "../components/input";
import { useFormik } from "formik";
import ButtonComponent from "../components/button";
import DropDown from "../components/dropDown";
import { FREQUENCY } from "../utilities/constants";
import TableComponent from "../components/table";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../types/types";
import { updateTags } from "../store/slices/setup";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import updateBudget from "../store/thunks/updateBudget";
import { AppDispatch } from "../store";
import addTagsAPI from "../store/thunks/addTags";
import AlertComponent from "../components/alert";
import useApiError from "../hooks/use-api-error";
import useAuth from "../hooks/use-auth";

function SetUp() {

    const [tagName, setTagName] = useState("");
    const [frequency, setFrequency] = useState<"DAILY" | "MONTHLY">("DAILY");

    const [error, handleApiError] = useApiError();

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: State) => state.user.token);

    const tags = useSelector((state: State) => {
        return state.setup.tags;
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagName(event.target.value);
    }

    const handleFrequency = (value: "DAILY" | "MONTHLY") => {
        setFrequency(value);
    }

    const handleSubmit = async (values: { budget: number }) => {
        let updateBudgetResponse: any = await dispatch(updateBudget({ amount: values.budget, token }));
        if (updateBudgetResponse.error) {
            await handleApiError(updateBudgetResponse.error.message)
        } else {
            let addTagsResponse: any = await dispatch(addTagsAPI({ tags, token }));
            if (addTagsResponse.error) {
                await handleApiError(addTagsResponse.error.message)
            } else navigate("/home");
        }
    }

    const addTags = () => {
        let updatedTags = [...tags];
        updatedTags.push({ name: tagName, frequency: frequency })
        dispatch(updateTags(updatedTags));
        setTagName("");
    }

    const formik = useFormik({
        initialValues: {
            budget: 0
        },
        onSubmit: handleSubmit
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Layout>
                    {error && <AlertComponent message={error} type="error" />}
                    <Row className="pt-10">
                        <Col span={7} offset={5} className="pt-2"><b>YOUR MONTHLY BUDGET</b></Col>
                        <Col span={5}><InputComponent type="number" placeholder="Amount" width="400" value={formik.values.budget == 0 ? "" : formik.values.budget} onChange={formik.handleChange} id="budget" name="budget" /></Col>
                        <Col span={5} className="text-xl pl-2 pt-1">₹</Col>
                    </Row>

                    <Row className="pt-14">
                        <Col span={10} offset={6}><b>ADD TAGS FOR YOUR EXPENSES</b></Col>
                    </Row>
                    <Row className="pt-5">
                        <Col span={4} offset={6}><InputComponent type="text" placeholder="Name" width="400" value={tagName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)} id="name" name="name" /></Col>
                        <Col offset={1} span={4}><DropDown options={FREQUENCY} onChange={handleFrequency} /></Col>
                        <Col offset={1} span={4} className="pt-1"><ButtonComponent type="primary" size="small" onClick={addTags}>+</ButtonComponent></Col>
                    </Row>
                    <Row className="pt-14">
                        <Col span={10} offset={6}><b>LIST OF TAGS</b></Col>
                    </Row>
                    <Row className="pt-5 pb-12">
                        <Col span={11} offset={6}><TableComponent tableData={tags} /></Col>
                    </Row>
                    <Row className="pt-1 pb-12">
                        <Col span={10} offset={10}><ButtonComponent type="primary" size="large" htmlType="submit">SAVE</ButtonComponent></Col>
                    </Row>
                </Layout>
            </form>
        </div>
    )
}

export default SetUp;
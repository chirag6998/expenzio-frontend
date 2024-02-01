import { Col, Row } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../components/input";
import ButtonComponent from "../components/button";
import Layout from "../components/layout";

function EditBudget() {

    const navigate = useNavigate();

    const handleSubmit = (values: { budget: number }) => {
        console.log(values);
        navigate("/home");
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
                    <Row>
                        <Col span={8} offset={9} className="pt-6 pl-5"><b>Enter Your New Budget</b></Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={8} className="pt-6"><InputComponent type="number" placeholder="Budget" width="400" value={formik.values.budget == 0 ? "" : formik.values.budget} onChange={formik.handleChange} id="budget" name="budget" /></Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={10} className="pt-6"><ButtonComponent type="primary" size="small" htmlType="submit">Update Budget</ButtonComponent></Col>
                    </Row>
                </Layout>
            </form>
        </div>
    )
}

export default EditBudget
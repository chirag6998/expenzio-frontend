import React from "react";
import Layout from "../components/layout";
import { Col, Row } from "antd";
import { useFormik } from "formik";
import { SignInType, signInSchema } from "../utilities/schema";
import InputComponent from "../components/input";
import ButtonComponent from "../components/button";
import ErrorComponent from "../components/error";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import signIn from "../store/thunks/signIn";
import { State } from "../types/types";
import { AppDispatch } from "../store";
import useApiError from "../hooks/use-api-error";
import AlertComponent from "../components/alert";
import useAuth from "../hooks/use-auth";

function SignIn() {

    const [ token, loading ] = useAuth();

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const [error, handleApiError] = useApiError();

    const handleSubmit = async (values: SignInType) => {
        let response: any = await dispatch(signIn(values));
        if (response.error) {
            await handleApiError(response.error.message)
        } else navigate("/home");
    }

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validationSchema: signInSchema,
        onSubmit: handleSubmit
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Layout>
                    {error && <AlertComponent message={error} type="error" />}
                    <Row>
                        <Col span={12} offset={10} className="pt-0 font-serif font-bold text-xl pl-5">Sign In</Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={8} className="pt-6"><InputComponent type="text" placeholder="Username" width="400" value={formik.values.userName} onChange={formik.handleChange} id="userName" name="userName" onBlur={formik.handleBlur} /></Col>
                    </Row>
                    {formik.touched.userName && formik.errors.userName ? <ErrorComponent>{formik.errors.userName}</ErrorComponent> : null}
                    <Row>
                        <Col span={8} offset={8} className="pt-6"><InputComponent type="password" placeholder="Password" width="400" value={formik.values.password} onChange={formik.handleChange} id="password" name="password" onBlur={formik.handleBlur} /></Col>
                    </Row>
                    {formik.touched.password && formik.errors.password ? <ErrorComponent>{formik.errors.password}</ErrorComponent> : null}
                    <Row>
                        <Col span={8} offset={10} className="pt-6 pl-5"><ButtonComponent type="primary" size="large" htmlType="submit" disabled={!formik.isValid || formik.isSubmitting}>SIGN IN</ButtonComponent></Col>
                    </Row>
                    <Row>
                        <Col span={10} offset={9} className="pt-5">
                            <a href="/" className="text-black hover:text-blue-600 font-serif">New User? Create New Account</a>
                        </Col>
                    </Row>
                </Layout>
            </form>
        </div>
    )
}

export default SignIn;
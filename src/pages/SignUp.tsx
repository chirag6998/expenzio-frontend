import { Col, Row } from "antd";
import { useFormik } from "formik";
import React from "react";
import ButtonComponent from "../components/button";
import InputComponent from "../components/input";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { signUpSchema } from "../utilities/schema";
import ErrorComponent from "../components/error";
import { useDispatch } from "react-redux";
import addUser from "../store/thunks/addUser";
import { User } from "../types/types";
import { AppDispatch } from "../store";
import useAuth from "../hooks/use-auth";
import Loading from "../components/loading";
import useApiError from "../hooks/use-api-error";
import AlertComponent from "../components/alert";

function SignUp() {

    const [ token, loading ] = useAuth();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const [error, handleApiError] = useApiError();

    const handleSubmit = async (values: User) => {
        let response: any = await dispatch(addUser(values));
        if (response.error) {
            await handleApiError(response.error.message)
        } else navigate("/setup");
    }

    const formik = useFormik({
        initialValues: {
            userName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: signUpSchema,
        onSubmit: handleSubmit
    })

    return (
        loading ? <Loading /> : (
            <div className="mt-10">
                <form onSubmit={formik.handleSubmit}>
                    <Layout>
                        {error && <AlertComponent message={error} type="error" />}
                        <Row>
                            <Col span={12} offset={8} className="pt-0 font-bold text-xl text-white">CREATE NEW ACCOUNT</Col>
                        </Row>

                        <Row>
                            <Col span={8} offset={8} className="pt-6"><InputComponent type="text" placeholder="Username" width="400" value={formik.values.userName} onChange={formik.handleChange} id="userName" name="userName" onBlur={formik.handleBlur} /></Col>
                        </Row>
                        {formik.touched.userName && formik.errors.userName ? <ErrorComponent>{formik.errors.userName}</ErrorComponent> : null}

                        <Row>
                            <Col span={8} offset={8} className="pt-6"><InputComponent type="text" placeholder="Phone" width="400" value={formik.values.phone} onChange={formik.handleChange} id="phone" name="phone" onBlur={formik.handleBlur} /></Col>
                        </Row>
                        {formik.touched.phone && formik.errors.phone ? <ErrorComponent>{formik.errors.phone}</ErrorComponent> : null}

                        <Row>
                            <Col span={8} offset={8} className="pt-6"><InputComponent type="email" placeholder="Email" width="400" value={formik.values.email} onChange={formik.handleChange} id="email" name="email" onBlur={formik.handleBlur} /></Col>
                        </Row>
                        {formik.touched.email && formik.errors.email ? <ErrorComponent>{formik.errors.email}</ErrorComponent> : null}

                        <Row>
                            <Col span={8} offset={8} className="pt-6"><InputComponent type="password" placeholder="Password" width="400" value={formik.values.password} onChange={formik.handleChange} id="password" name="password" onBlur={formik.handleBlur} /></Col>
                        </Row>
                        {formik.touched.password && formik.errors.password ? <ErrorComponent>{formik.errors.password}</ErrorComponent> : null}

                        <Row>
                            <Col span={8} offset={8} className="pt-6"><InputComponent type="password" placeholder="Confirm Password" width="400" value={formik.values.confirmPassword} onChange={formik.handleChange} id="confirmPassword" name="confirmPassword" onBlur={formik.handleBlur} /></Col>
                        </Row>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <ErrorComponent>{formik.errors.confirmPassword}</ErrorComponent> : null}

                        <Row>
                            <Col span={8} offset={10} className="pt-6 pl-5"><ButtonComponent type="primary" size="large" htmlType="submit" disabled={!formik.isValid || formik.isSubmitting}>SIGN UP</ButtonComponent></Col>
                        </Row>
                        <Row>
                            <Col span={8} offset={9} className="pt-5 pl-4">
                                <a href="/signin" className="text-white hover:text-blue-300">Already Have An Account?</a>
                            </Col>
                        </Row>
                    </Layout>
                </form>
            </div>
        )
    )
}

export default SignUp;
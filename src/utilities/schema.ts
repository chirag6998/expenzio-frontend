import { InferType, object, ref, string } from "yup";

export const signUpSchema = object({
    userName: string().required().label("Username"),
    email: string().email().required().label("Email"),
    phone: string().min(10).max(10).required().label("Phone"),
    password: string().min(8).required().label("Password"),
    confirmPassword: string().required().oneOf([ref("password")], "Password must match").label(" Confirm password")
})

export const signInSchema = object({
    userName: string().required().label("Username"),
    password: string().min(8).required().label("Password")
})

export type SignInType = InferType<typeof signInSchema>
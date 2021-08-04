import { matches } from "lodash"
import {object, string, ref} from "yup"

export const createUserSchema = object({
    body: object({
        full_name: string().required("name is required"),
        password: string()
            .required("password is required")
            .min(6, "password is too short - should 6 chars minimum")
            .matches(/^[a-zA-Z0-9_.-]*$/, "password can only contain latin letters"),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "password must match"
        ),
        email: string()
            .email("must be a valid email")
            .required("email is required")
            .matches(/^\S+@\S+\.\S+$/, "password can only contain latin letters"),
    })
})

export const createSessionSchema = object({
    body: object({
        password: string()
            .required("password is required")
            .min(6, "password is too short - should 6 chars minimum")
            .matches(/^[a-zA-Z0-9_.-]*$/, "password can only contain latin letters"),
        email: string()
            .email("must be a valid email")
            .required("email is required")
            .matches(/^\S+@\S+\.\S+$/, "password can only contain latin letters"),
    })
})
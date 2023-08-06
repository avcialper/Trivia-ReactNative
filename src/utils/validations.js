import * as yup from 'yup'

const signInValidations = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email.")
        .required("Email address is required."),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be least ${min} characters.`)
        .required("Password is required.")
})

const signUpValidations = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email.")
        .required("Email address is require."),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be least ${min} characters.`)
        .required("Password is required."),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Password must match.")
        .required("Password confirm is required")
})

export { signUpValidations, signInValidations }
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

const updatePasswordValidations = yup.object().shape({
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be least ${min} characters.`)
        .required("Current password is required."),
    newPassword: yup
        .string()
        .min(8, ({ min }) => `Password must be least ${min} characters.`)
        .required("New password is required."),
    newPasswordConfirm: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Password must match.")
        .required("New password confirm is required")

})

const updateEmailValidations = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email.")
        .required("Email address is require."),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be least ${min} characters.`)
        .required("Password is required.")
})

export { signUpValidations, signInValidations, updatePasswordValidations, updateEmailValidations }
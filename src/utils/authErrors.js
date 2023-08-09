export const errorMessage = (code) => {
    const errorMessages = {
        "auth/invalid-email": "Invalid email address.",
        "auth/user-disabled": "Email address disabled.",
        "auth/user-not-found": "Registered user not found.",
        "auth/wrong-password": "The provided password is incorrect.",
        "auth/email-already-exists'": "Email address already exists.",
        "auth/invalid-credential": "The supplied credential is malformed or has expired.",
        "auth/invalid-recipient-email": "The recipient email is invalid.",
        "auth/invalid-password": "The provided password is not valid.",
        "auth/wrong-password": "The password is wrong."
    }
    return errorMessages[code] || "Unknown error occurred."
}
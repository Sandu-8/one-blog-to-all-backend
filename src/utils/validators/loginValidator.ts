import {object, string} from "yup";
import {minAndMaxError, passwordError, requiredError} from "../helper_functions/validationMessageHelper";

const loginValidator = object({
    email: string().email('Invalid email format')
        .required(requiredError('Email')),
    password: string().min(8, minAndMaxError('Password', 8))
        .max(40, minAndMaxError('Password', 40, false))
        .matches(/[0-9]/, passwordError("digit"))
        .matches(/[a-z]/, passwordError("lowercase"))
        .matches(/[A-Z]/, passwordError("uppercase"))
        .required(requiredError('Password')),
});

export default loginValidator;

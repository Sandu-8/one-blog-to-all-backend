import { object, string } from 'yup';
import { minAndMaxError, passwordError, requiredError } from "../helper_functions/validationMessageHelper";

const userCreationValidator = object({
    name: string().min(3, minAndMaxError('Name', 3))
        .max(30, minAndMaxError('Name', 30, false))
        .required(requiredError('Name')),
    lastname: string().min(3, minAndMaxError('Lastname', 3))
        .max(30, minAndMaxError('Lastname', 30, false))
        .required(requiredError('Lastname')),
    username: string().min(3, minAndMaxError('Username', 3))
        .max(30, minAndMaxError('Username', 30, false))
        .required(requiredError('Username')),
    email: string().email('Invalid email format')
        .required(requiredError('Email')),
    password: string().min(8, minAndMaxError('Password', 8))
        .max(40, minAndMaxError('Password', 40, false))
        .matches(/[0-9]/, passwordError("digit"))
        .matches(/[a-z]/, passwordError("lowercase"))
        .matches(/[A-Z]/, passwordError("uppercase"))
        .required(requiredError('Password')),
});

export default userCreationValidator;

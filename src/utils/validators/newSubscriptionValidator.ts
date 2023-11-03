import {number, object, string} from "yup";
import {minAndMaxError, passwordError, requiredError} from "../helper_functions/validationMessageHelper";

const newSubscriptionValidator = object({
    userId: number()
        .required(requiredError('User id')),
    channelId: number()
        .required(requiredError('Channel id')),
});

export default newSubscriptionValidator;

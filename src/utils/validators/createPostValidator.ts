import {number, object, string} from "yup";
import {minAndMaxError, requiredError} from "../helper_functions/validationMessageHelper";

const createPostValidator = object({
    title: string().min(1, minAndMaxError('title', 1))
        .max(70, minAndMaxError('title', 70, false))
        .required(requiredError('title')),
    image: string().max(200, minAndMaxError('image', 200, false)),
    content: string().min(1, minAndMaxError('content', 1))
        .max(3000, minAndMaxError('content', 3000, false))
        .required(requiredError('content')),
    channelId: number().required(requiredError('channelId')),
});

export default createPostValidator;

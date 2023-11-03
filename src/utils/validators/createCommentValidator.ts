import {number, object, string} from "yup";
import {minAndMaxError, requiredError} from "../helper_functions/validationMessageHelper";

export const createCommentValidator = object({
    postId: number().required(requiredError('postId')),
    userId: number().required(requiredError('userId')),
    comment: string().min(1, minAndMaxError('Comment', 1))
        .max(200, minAndMaxError('Comment', 200, false))
        .required(requiredError('Comment')),
});
export default createCommentValidator;

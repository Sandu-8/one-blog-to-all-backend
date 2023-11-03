import {number, object, string} from "yup";
import {minAndMaxError, requiredError} from "../helper_functions/validationMessageHelper";

const updateCommentValidator = object({
    commentId: number().required(requiredError('commentId')),
    comment: string().min(1, minAndMaxError('Comment', 1))
        .max(200, minAndMaxError('Comment', 200, false))
        .required(requiredError('Comment')),
});

export default updateCommentValidator;

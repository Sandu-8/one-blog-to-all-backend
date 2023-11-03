import { object, string } from "yup";
import { minAndMaxError } from "../helper_functions/validationMessageHelper";

const createPostValidator = object({
    title: string().min(1, minAndMaxError('title', 1))
        .max(70, minAndMaxError('title', 70, false)),
    image: string().max(200, minAndMaxError('image', 200, false)),
    content: string().min(1, minAndMaxError('content', 1))
        .max(3000, minAndMaxError('content', 3000, false)),
});

export default createPostValidator;

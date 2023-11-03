import { object, string} from "yup";
import {minAndMaxError, requiredError} from "../helper_functions/validationMessageHelper";

export const channelUpdateValidator = object({
    image: string().min(3, minAndMaxError('Image', 3))
        .max(200, minAndMaxError('Image', 200, false)),
    name: string().min(3, minAndMaxError('Name', 3))
        .max(30, minAndMaxError('Name', 30, false)),
    link: string().min(3, minAndMaxError('Link', 3))
        .max(200, minAndMaxError('Link', 200, false)),
    description: string().min(5, minAndMaxError('Description', 5))
        .max(200, minAndMaxError('Description', 200, false)),
});
 export default channelUpdateValidator;

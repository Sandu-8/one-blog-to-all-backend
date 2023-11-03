const minAndMaxError = (field: string, fieldLength: number, isMin: boolean = true) => {
    const message: string = isMin ? 'minimum' : 'maximum';
    return `${field} must contain ${message} ${fieldLength} characters`;
}
const requiredError = (field: string) => `${field} is required`;
const passwordError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
};

export { minAndMaxError, requiredError, passwordError };

export const loginValidationRule = {
    email: {
        email: true,
    },
    password: {
        presence: true,
        length: {
            minimum: 4,
            message: '^Password length too small',
        },
    },
};

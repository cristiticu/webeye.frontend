export const loginValidationRule = {
    email: {
        email: true,
    },
    firstName: {
        length: {
            minimum: 1,
            maximum: 32,
            tooShort: '^Enter your name',
            tooLong: '^Too many characters',
        },
        format: {
            pattern: "^[a-z ,.'-]+$",
            flags: 'i',
            message: '^Contains invalid characters',
        },
    },
    lastName: {
        length: {
            maximum: 32,
            tooLong: '^Too many characters',
        },
        format: {
            pattern: "^[a-z ,.'-]+$",
            flags: 'i',
            message: '^Contains invalid characters',
        },
    },
    password: {
        length: {
            minimum: 4,
            message: '^Password length too small',
        },
    },
};

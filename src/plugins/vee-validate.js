import * as Yup from 'yup'

// Configure the error messages for Yup
Yup.setLocale({
    mixed: {
        required: 'Vui lòng nhập ${label}.',
    },
    string: {
        email: 'Email không hợp lệ.',
    },
});
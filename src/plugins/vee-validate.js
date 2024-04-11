import * as Yup from 'yup'

// Configure the error messages for Yup
Yup.setLocale({
    mixed: {
        required: 'Vui lòng nhập ${label}.',
    },
    string: {
        email: 'Email không hợp lệ.',
        min: 'Quá ngắn, tối thiểu ${min} ký tự.',
        max: 'Quá dài, tối đa ${max} ký tự.'
    },
});
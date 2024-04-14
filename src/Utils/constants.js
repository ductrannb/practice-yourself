const RESPONSES = {
    HTTP_OK: 200,
    HTTP_CREATED: 201,
    HTTP_NO_CONTENT: 204,
    HTTP_UNAUTHORIZED: 401,
    HTTP_NOT_ACCEPTABLE: 406,
    HTTP_INTERNAL_SERVER_ERROR: 500,
}
const LESSON_LEVEL = {
    CODE: {
        LEVEL_EASY: 1,
        LEVEL_MEDIUM: 2,
        LEVEL_HARD: 3,
    },
    TEXT: {
        LEVEL_EASY: 'Nhận biết',
        LEVEL_MEDIUM: 'Thông hiểu',
        LEVEL_HARD: 'Vận dụng',
    },
}
export default {
    RESPONSES,
    LESSON_LEVEL,
}
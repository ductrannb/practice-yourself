const RESPONSES = {
    HTTP_OK: 200,
    HTTP_CREATED: 201,
    HTTP_NO_CONTENT: 204,
    HTTP_UNAUTHORIZED: 401,
    HTTP_NOT_ACCEPTABLE: 406,
    HTTP_INTERNAL_SERVER_ERROR: 500,
}
const QUESTION_LEVEL = {
    CODE: {
        LEVEL_EASY: 1,
        LEVEL_MEDIUM: 2,
        LEVEL_HARD: 3,
    },
    TEXT: {
        LEVEL_EASY: 'Cơ bản',
        LEVEL_MEDIUM: 'Vận dụng',
        LEVEL_HARD: 'Vận dụng cao',
    },
}
const ROLE = {
    USER: 1,
    TEACHER: 2,
    ADMIN: 3
}
export default {
    RESPONSES,
    QUESTION_LEVEL,
    ROLE
}
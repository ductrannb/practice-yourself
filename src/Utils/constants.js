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
const QUESTION_TYPE = {
    LESSON: 1,
    EXAM: 2
}
const PAYMENT_TYPE = {
    RECHARGE: 1,
    PURCHASE: 2
}

const QUESTION_QUICKLY_MODE = {
    CHOICE: 1,
    LEVEL: 2
}

const IMPORT_QUESTION_TYPE = {
    EXAM: 1,
    LESSON: 2
}

const PUSHER_CHANNELS = {
    IMPORT_QUESTION: 'import-questions',
}

const PUSHER_EVENTS = {
    IMPORT_QUESTION_DONE: 'import-questions-done',
}

export default {
    RESPONSES,
    QUESTION_LEVEL,
    ROLE,
    QUESTION_TYPE,
    PAYMENT_TYPE,
    QUESTION_QUICKLY_MODE,
    PUSHER_CHANNELS,
    PUSHER_EVENTS,
    IMPORT_QUESTION_TYPE
}
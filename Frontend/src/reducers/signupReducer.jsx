// initial state
export const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
}

// signup reducer
export default function reducer(state, action) {
    
    const ACTION_TYPE = {
        NAME_ACTION: 'name',
        EMAIL_ACTION: 'email',
        PHONE_ACTION: 'phone',
        PASSWORD_ACTION: 'password',
        CONFIRM_ACTION: 'confirm',
    }
    switch (action.type) {
        case ACTION_TYPE.NAME_ACTION:
             return {
                ...state,
                name: action.payload
             }
        case ACTION_TYPE.EMAIL_ACTION:
             return {
                ...state,
                email: action.payload
             }
        case ACTION_TYPE.PHONE_ACTION:
            return {
                ...state,
                phone: action.payload
            }
        case ACTION_TYPE.PASSWORD_ACTION:
            return {
                ...state,
                password: action.payload
            }
        case ACTION_TYPE.CONFIRM_ACTION:
            return {
                ...state,
                confirm: action.payload
            }
        default:
            return state
    }
}
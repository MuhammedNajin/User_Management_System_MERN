export const initialErrorState = {
    nameError: '',
    emailError: '',
    phoneError: '',
    passwordError: '',
    confirmError: '',
};



export default function errorReducer( state, action) {
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
                nameError: action.payload
             }
        case ACTION_TYPE.EMAIL_ACTION:
             return {
                ...state,
                emailError: action.payload
             }
        case ACTION_TYPE.PHONE_ACTION:
            return {
                ...state,
                phoneError: action.payload
            }
        case ACTION_TYPE.PASSWORD_ACTION:
            return {
                ...state,
                passwordError: action.payload
            }
        case ACTION_TYPE.CONFIRM_ACTION:
            return {
                ...state,
                confirmError: action.payload
            }
        default:
            return state
    }
}
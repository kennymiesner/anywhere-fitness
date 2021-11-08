import { RESERVE_CLASS, CANCEL_CLASS } from "../actions/reserveActions"

export const initialState = {
    bookedClasses: [],
}

export const reserveReducer = (state = initialState, action) => {
    switch (action.type) {
        case (RESERVE_CLASS): {
            return {
                ...state,
                bookedClasses: [...state.bookedClasses, action.payload]
            }
        }
        case (CANCEL_CLASS): {
            return {
                ...state,
                bookedClasses: state.bookedClasses.filter(item => (
                    action.payload.email === item.email && action.payload.id !== item.id)
                )
            }
        }
        default:
            return state;
    }
}

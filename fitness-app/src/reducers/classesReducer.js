import { FETCH_START, FETCH_SUCCESS, FETCH_FAIL, ADD_CLASS, EDIT_CLASS, DELETE_CLASS } from '../actions/classActions';
import classes from '../data/classes';

const initialState = {
    classes: classes,
    isFetching: false,
    error: ''
};

export const classesReducer = (state = initialState, action) => {
    switch (action.type) {
        case (FETCH_START):
            return ({
                ...state,
                classes: [],
                isFetching: true,
                error: '',
            });
        case (FETCH_SUCCESS):
            return ({
                ...state,
                classes: action.payload.data,
                isFetching: false,
                error: '',
            });
        case (FETCH_FAIL):
            return ({
                ...state,
                classes: [],
                isFetching: false,
                error: action.payload,
            });
        case (ADD_CLASS):
            return ({
                ...state,
                classes: [...state.classes, action.payload],
                isFetching: false,
                error: '',
            });
        case (EDIT_CLASS):
            return ({
                ...state,
                classes: state.classes.map(
                    item => item.id === action.payload.id ? action.payload : item
                ),
                isFetching: false,
                error: '',
            });
        case (DELETE_CLASS):
            return ({
                ...state,
                classes: state.classes.filter(item => (action.payload !== item.id)),
                isFetching: false,
                error: '',
            });
        default:
            return state;
    }
}
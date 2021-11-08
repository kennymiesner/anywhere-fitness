export const RESERVE_CLASS = "RESERVE_CLASS";
export const CANCEL_CLASS = "CANCEL_CLASS";

export const reserveClass = (item) => {
    return ({ type: RESERVE_CLASS, payload: item });
}

export const cancelClass = (item) => {
    return ({ type: CANCEL_CLASS, payload: item });
}
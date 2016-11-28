import {ActionReducer, Action} from "@ngrx/store";
import {Phone} from "../../models/Phone";
import {PhoneActions} from "../actions/PhoneActions";

export const PhonesReducer: ActionReducer<Array<Phone>> =
    (state: Array<Phone> = [], action: Action) => {
    switch (action.type) {
        case PhoneActions.GET_SUCCESS:
            return action.payload;
        case PhoneActions.ADD:
            // Object.assign only does a shallow copy
            return [...state,action.payload];
        default:
            return state;
    }
};
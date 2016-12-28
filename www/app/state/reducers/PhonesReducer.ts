import {ActionReducer, Action} from '@ngrx/store';
import {Phone} from '../../models/Phone';
import {PhoneActions} from '../actions/PhoneActions';
import {List} from "immutable";

export const PhonesReducer: ActionReducer<List<Phone>> =
    (state: List<Phone> = List([]), action: Action) => {
    switch (action.type) {
        case PhoneActions.GET_SUCCESS:
            return List(<Array<Phone>>action.payload);
        case PhoneActions.ADD:
            return state.push(<Phone>action.payload);
        default:
            return state;
    }
};
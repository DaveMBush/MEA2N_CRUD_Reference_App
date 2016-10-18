import { ActionReducer, Action } from '@ngrx/store';
import { Contact } from '../../models/Contact';
import { ContactActions } from '../actions/ContactActions';

export const ContactsReducer: ActionReducer<Array<Contact>> = (state: Array<Contact>, action: Action) => {
    switch (action.type) {
        case ContactActions.LIST:
            return state;
        case ContactActions.ADD:
            action.payload._id = 'x';
            return [...state,action.payload];
        default:
            return state;
    }
};
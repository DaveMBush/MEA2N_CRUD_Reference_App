import { ActionReducer, Action } from '@ngrx/store';
import { Contact } from '../../models/Contact';
import { ContactActions } from '../actions/ContactActions';

export const ContactsReducer: ActionReducer<Array<Contact>> = (state: Array<Contact> = [], action: Action) => {
    switch (action.type) {
        case ContactActions.LIST:
            return state;
        case ContactActions.ADD:
            var last = state.reduce((previous,current)=>{
                if(current._id >previous._id){
                    return current;
                }
                return previous;
            },{_id: '0'});
            action.payload._id = (last._id + 1).toString();
            return [...state,action.payload];
        case ContactActions.REMOVE:
            return state.filter(contact => contact._id !== action.payload);
        case ContactActions.UPDATE:
            return state.map(contact => {
                if(contact._id === action.payload._id){
                    return action.payload;
                }
                return contact;
            });
        default:
            return state;
    }
};
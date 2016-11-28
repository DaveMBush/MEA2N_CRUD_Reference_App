import { ActionReducer, Action } from '@ngrx/store';
import { Contact } from '../../models/Contact';
import { ContactActions } from '../actions/ContactActions';

export const ContactReducer: ActionReducer<Contact> =
    (state: Contact = <Contact>{_id:'',name:'',sex:'',dob: new Date(),phones:[]},
     action: Action) => {
    switch (action.type) {
        case ContactActions.GET_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
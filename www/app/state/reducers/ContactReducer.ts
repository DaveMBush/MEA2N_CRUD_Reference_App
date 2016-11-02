import { ActionReducer, Action } from '@ngrx/store';
import { Contact } from '../../models/Contact';
import { ContactActions } from '../actions/ContactActions';
import {PhoneActions} from "../actions/PhoneActions";

export const ContactReducer: ActionReducer<Contact> =
    (state: Contact = <Contact>{_id:'',name:'',sex:'',dob: new Date(),phones:[]},
     action: Action) => {
    switch (action.type) {
        case ContactActions.GET_SUCCESS:
            return action.payload;
        case PhoneActions.ADD:
            // Object.assign only does a shallow copy
            var newState = Object.assign({},state);
            newState.phones = [...state.phones,action.payload];
            return newState;
        default:
            return state;
    }
};
import {Action} from '@ngrx/store';

import {Contact} from '../../models/Contact';

export class ContactActions {
    static LIST = 'ContactActions.1';
    static list(): Action{
        return {type: ContactActions.LIST}
    }
    static LIST_SUCCESS = 'ContactActions.1.s';
    static listSuccess(contacts){
        return {type: ContactActions.LIST_SUCCESS, payload: contacts}
    }
    static ADD = 'ContactActions.2';
    static add(contact: Contact): Action{
        return {type: ContactActions.ADD,payload: contact}
    }

    static UPDATE = 'ContactActions.3';
    static update(contact: Contact): Action {
        return {type: ContactActions.UPDATE, payload: contact}
    }

    static REMOVE = 'ContactActions.4';
    static remove(id: number){
        return {type: ContactActions.REMOVE, payload: id}
    }

    static GET = 'ContactActions.5';
    static get(id: number = -1){
        return {type: ContactActions.GET, payload: id}
    }

    static GET_SUCCESS = 'ContactActions.5.s';
    static getSuccess(contact: Contact){
        if(contact._id === ''){
            contact._id = '-1';
        }
        return {type: ContactActions.GET_SUCCESS, payload: contact}
    }


}
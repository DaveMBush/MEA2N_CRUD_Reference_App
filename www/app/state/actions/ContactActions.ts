import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Contact} from '../../models/Contact';

@Injectable()
export class ContactActions {
    static LIST = 'ContactActions.1';
    static list(): Action{
        return {type: ContactActions.LIST}
    }
    static ADD = 'ContactActions.2';
    static add(contact: Contact): Action{
        return {type: ContactActions.ADD,payload: contact}
    }

    static UPDATE = 'ContactActions.3';
    static update(contact: Contact): Action {
        return {type: ContactActions.UPDATE, payload: contact}
    }

    static DELETE = 'ContactActions.4';
    static remove(id: number){
        return {type: ContactActions.DELETE, payload: id}
    }
}
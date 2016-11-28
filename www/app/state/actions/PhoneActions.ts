import {Action} from '@ngrx/store';

import {Phone} from '../../models/Phone';

export class PhoneActions {
    static LIST = 'PhoneActions.1';
    static list(): Action{
        return {type:PhoneActions.LIST};
    }
    static ADD = 'PhoneActions.2';
    static add(phone: Phone): Action{
        return {type: PhoneActions.ADD,payload: phone};
    }
    static GET_SUCCESS = 'PhoneActions.3';
    static getSuccess(phones: Array<Phone>){
        return {type: PhoneActions.GET_SUCCESS,payload: phones};
    }

}

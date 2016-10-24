import {Injectable} from "@angular/core";
import {Effect, Actions} from '@ngrx/effects'
import {ContactActions} from '../actions/ContactActions';
import {Contacts} from '../../services/Contacts';
import {Contact} from "../../models/Contact";

@Injectable()
export class ContactEffects {
    constructor(private update$: Actions,
                private contacts: Contacts) {
    }

    @Effect() loadContact$ = this.update$
        .ofType(ContactActions.GET)
        .map(action => action.payload)
        .switchMap((id)=>this.contacts.get(id))
        .map((contact:Contact) =>
            ContactActions.getSuccess(contact));
}
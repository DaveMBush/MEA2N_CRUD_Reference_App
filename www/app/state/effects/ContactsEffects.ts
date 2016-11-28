import {Injectable} from "@angular/core";
import {Effect, Actions} from '@ngrx/effects'
import {ContactActions} from '../actions/ContactActions';
import {Contacts} from '../../services/Contacts';

@Injectable()
export class ContactsEffects{
    constructor (
        private update$: Actions,
        private contacts: Contacts
    ){ }

    @Effect() loadContacts$ = this.update$
        .ofType(ContactActions.LIST)
        .switchMap(()=>this.contacts.list())
        .map(contacts => ContactActions.listSuccess(contacts));

    @Effect() addContact$ = this.update$
        .ofType(ContactActions.ADD)
        .map(action => action.payload)
        .switchMap(contact => this.contacts.add(contact))
        .switchMap(()=>this.contacts.list())
        .map(contacts => ContactActions.listSuccess(contacts));
    @Effect() updateContact$ = this.update$
        .ofType(ContactActions.UPDATE)
        .map(action => action.payload)
        .switchMap(contact => this.contacts.save(contact))
        .switchMap(()=>this.contacts.list())
        .map(contacts => ContactActions.listSuccess(contacts));

    @Effect() removeContact$ = this.update$
        .ofType(ContactActions.REMOVE)
        .map(action => action.payload)
        .switchMap(id => this.contacts.remove(id))
        .switchMap(()=> this.contacts.list())
        .map(contacts => ContactActions.listSuccess(contacts));
}
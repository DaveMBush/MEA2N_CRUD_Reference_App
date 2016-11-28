import {Injectable} from "@angular/core";
import {Effect, Actions} from '@ngrx/effects'
import {ContactActions} from '../actions/ContactActions';
import {Contacts} from '../../services/Contacts';
import {Observable} from 'rxjs';
import contact from '../schemas/contact';
import {normalize} from "normalizr";
import {PhoneActions} from "../actions/PhoneActions";

@Injectable()
export class ContactEffects {
    constructor(private update$: Actions,
                private contacts: Contacts) {
    }

    @Effect() loadContact$ = this.update$
        .ofType(ContactActions.GET)
        .map(action => action.payload)
        .switchMap((id)=>this.contacts.get(id))
        // setup for multiple return actions
        .mergeMap((result) => {
                let normalized = normalize(result,contact);
                let contacts = normalized.entities.contacts;
                let phones = normalized.entities.phones;
                if(!phones){
                    phones = [];
                }
                return Observable.from([
                    ContactActions.getSuccess(Object.keys(contacts).map((k)=>contacts[k])[0]),
                    PhoneActions.getSuccess(Object.keys(phones).map((k)=>phones[k]))
                ]);
            }
        );

}
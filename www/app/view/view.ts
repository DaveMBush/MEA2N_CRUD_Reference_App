import { Component, OnInit }       from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ContactActions} from "../state/actions/ContactActions";
import {Observable} from "rxjs";
import {AppState} from '../state/interfaces/AppState';
import {Contact} from "../models/Contact";

@Component({
    moduleId: module.id,
    templateUrl: 'template.html',
    providers: []
})
export class View implements OnInit {
    private contacts: Observable<Array<Contact>>;
    constructor(
        private store: Store<AppState>,
        private router:Router){
        this.contacts = <Observable<Array<Contact>>>store.select('contacts');
    }
    ngOnInit() {
        this.store.dispatch(ContactActions.list());
    }

    add(){
        this.router.navigate(['add']);
    }
    edit(id){
        this.router.navigate(['edit', id]);
    }
    remove(id){
       this.store.dispatch(ContactActions.remove(id));
    }
}

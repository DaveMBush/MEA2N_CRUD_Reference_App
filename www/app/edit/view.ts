import { Component, OnInit } from '@angular/core';
import {Contact} from "../models/Contact";
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../state/interfaces/AppState';
import {ContactActions} from "../state/actions/ContactActions";
import {Observable} from "rxjs";

@Component({
    moduleId: module.id,
    templateUrl: 'template.html'
})
export class View implements OnInit {
    private contacts: Observable<Array<Contact>>;
    constructor(private router:Router, private route:ActivatedRoute,
                private formBuilder:FormBuilder,
                private store: Store<AppState>
    ){
        this.contacts = <Observable<Array<Contact>>>store.select('contacts');
        this.form = formBuilder.group({
           name: ['',Validators.required],
            sex: ['',Validators.required],
            dob: [((new Date()).toLocaleDateString()),Validators.compose([ Validators.required, View.isDate])]
        });
    }
    form: FormGroup;
    static isDate(c: FormControl){
        if(!c.value.match(/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/))
            return {invalidDate:true};
    }
    sexArray: any[] = [{name: 'Male', val: 'M'},{name: 'Female', val: 'F'}];
    contact:Contact = {_id:'', name: '',sex: '', dob: new Date()};
    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = params['id'];
            if(id){
                this.getContact(id);
            }
        });
    }
    getContact(id){
        this.contacts.subscribe(
            contacts => contacts
                .filter(contact => contact._id === id)
                .map(contact => {
                    this.contact._id = contact._id;
                    this.form.controls['name'].setValue(contact.name);
                    this.form.controls['sex'].setValue(contact.sex);
                    this.form.controls['dob'].setValue(contact.dob.toLocaleDateString());
                })
        );
    }
    cancel(){
        // something about calling navigate directly causes
        // the root page to completely refresh.  setTimeout
        // keeps it refreshing in place.  I suspect it has
        // something to do with the event still being
        // active?
       setTimeout(() => this.router.navigate(['']),1 );
    }
    fillContactFromForm(){
        this.contact.dob = new Date(this.form.controls['dob'].value);
        this.contact.name = this.form.controls['name'].value;
        this.contact.sex = this.form.controls['sex'].value;
    }
    add(){
        this.fillContactFromForm();
        this.contact._id = '1';
        this.store.dispatch(ContactActions.add(this.contact));
        setTimeout(() => this.router.navigate(['']),1 );
    }
    save(){
        this.fillContactFromForm();
        this.store.dispatch(ContactActions.update(this.contact));
        setTimeout(() => this.router.navigate(['']),1 );
    }
}

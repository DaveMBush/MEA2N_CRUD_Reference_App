import {Component, OnInit, OnDestroy} from '@angular/core';
import {Contact} from "../models/Contact";
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../state/interfaces/AppState';
import {ContactActions} from "../state/actions/ContactActions";
import {Observable, Subscription} from "rxjs";
import {Phone} from "../models/Phone";
import {PhoneActions} from "../state/actions/PhoneActions";

@Component({
    moduleId: module.id,
    templateUrl: 'template.html'
})
export class View implements OnInit, OnDestroy {
    private observableContact: Observable<Contact>;
    private contactSubscription: Subscription;
    constructor(private router:Router, private route:ActivatedRoute,
                private formBuilder:FormBuilder,
                private store: Store<AppState>
    ){
        this.observableContact = <Observable<Contact>>store.select('contact');
        this.phones = <Observable<Array<Phone>>>store.select('phones');

        this.form = formBuilder.group({
           name: ['',Validators.required],
            sex: ['',Validators.required],
            dob: ['',
                Validators.compose([ Validators.required, View.isDate])]
        });
        this.phoneForm = formBuilder.group({
            phone: ['',Validators.required]
        });
    }

    isValid():boolean
    {
        return this.form.valid;
    }
    phones: Observable<Array<Phone>>;
    form: FormGroup;
    phoneForm: FormGroup;
    static isDate(c: FormControl){
        if(!c.value.match(/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/))
            return {invalidDate:true};
    }
    sexArray: any[] = [{name: 'Male', val: 'M'},{name: 'Female', val: 'F'}];
    contact:Contact = {_id:'', name: '',sex: '', dob: new Date()};
    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = params['id'];
            if(!id){
                id = -1;
            }
            this.getContact(id);
        });
    }
    ngOnDestroy(): void {
        if(this.contactSubscription){
            this.contactSubscription.unsubscribe();
        }
    }
    getContact(id){
        this.contactSubscription = this.observableContact.subscribe(
            contact =>
            {
                this.contact._id = contact._id;
                this.form.controls['name'].setValue(contact.name);
                this.form.controls['sex'].setValue(contact.sex);
                let dob = contact.dob.toLocaleDateString();
                this.form.controls['dob'].setValue(dob);
            }
        );

        this.store.dispatch(ContactActions.get(id));
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
        let me = this;
        this.phones.subscribe((phones) => me.contact.phones = phones);
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
    addPhone(){
        let phone:Phone = {phone:this.phoneForm.controls['phone'].value,contactId:this.contact._id};
        this.phoneForm.controls['phone'].setValue('');
        this.store.dispatch(PhoneActions.add(phone));
    }
}

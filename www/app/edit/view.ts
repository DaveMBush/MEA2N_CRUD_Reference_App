import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Contact} from "../models/Contact";
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../state/interfaces/AppState';
import {ContactActions} from "../state/actions/ContactActions";
import {Observable, Subscription, Subject} from "rxjs";
import {Phone} from "../models/Phone";
import {PhoneActions} from "../state/actions/PhoneActions";
const deepAssign = require('deep-assign');

@Component({
    moduleId: module.id,
    templateUrl: 'template.html'
})
export class View implements OnInit {
    @ViewChild('addPhone', {read:ElementRef}) addPhone: ElementRef;
    @ViewChild('top', {read:ElementRef}) top: ElementRef;
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
    phone:Phone = {contactId:'',phone:''};
    ngOnInit() {
        this.listenToForms();

        this.handleButtons();

        this.getData();
    }

    private handleButtons():void {

        // sure is a lot of work to get what amounts to a switch statement.
        let clickObserver = Observable.fromEvent(this.top.nativeElement,'click');

        let parts = clickObserver.partition(()=>{return event.srcElement.textContent === ' Add' &&
            !event.srcElement.classList.contains('btn-primary');})

        let addPhone$ = parts[0];

        parts = parts[1].partition(()=>{
            return event.srcElement.textContent === ' Add' &&
                event.srcElement.classList.contains('btn-primary');
        });

        let addContact$ = parts[0];

        parts = parts[1].partition(()=>{
            return event.srcElement.textContent === ' Save';
        });

        let saveContact$ = parts[0];

        parts = parts[1].partition(()=>{
            return event.srcElement.textContent === ' Cancel';
        });

        let cancel$ = parts[0];

        Observable.merge(
            cancel$,
            saveContact$.map(()=>{
                this.store.dispatch(ContactActions.update(this.contact));
            }),
            addContact$.map(()=>{
                this.store.dispatch(ContactActions.add(this.contact));
            })
        ).subscribe(()=>{
            this.router.navigate(['']);
        });


        addPhone$.subscribe(()=>{
            this.store.dispatch(PhoneActions.add(this.phone));
            this.phoneForm.patchValue({phone:''});
        });
    }

    private getData():void{
        this.contactSubscription = this.observableContact.subscribe(
            contact => {
                this.contact._id = contact._id;
                this.form.patchValue({
                    name: contact.name,
                    sex:contact.sex,
                    dob:contact.dob.toLocaleDateString()
                });
            });
        this.route.params.subscribe(params => {
            this.store.dispatch(ContactActions.get(params['id'] ? params['id'] : '-1'));
        });
    }

    private listenToForms(): void {
        this.form.valueChanges.subscribe((value)=>{
            this.contact = deepAssign({},this.contact,value);
        });
        this.phoneForm.valueChanges.subscribe((value)=>{
            this.phone = deepAssign({},this.phone,value);
        });
        this.phones.subscribe((phones)=>{
            this.contact.phones = phones;
        });
    }
}

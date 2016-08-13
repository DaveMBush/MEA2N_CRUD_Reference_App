///<reference path="../../../node_modules/@angular/common/src/forms-deprecated/validators.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {Contact} from "../interfaces/Contact";
import {Contacts} from "../services/Contacts";
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {TextField} from '../components/textField/view';
import {DropdownField} from '../components/dropdownField/view';

@Component({
    moduleId: module.id,
    templateUrl: 'template.html',
    providers: [Contacts, FormBuilder],
    directives: [TextField,DropdownField]
})
export class View implements OnInit {
    constructor(private contacts:Contacts, private router:Router, private route:ActivatedRoute,
                private formBuilder:FormBuilder){


        this.form = formBuilder.group({
           name: ['',Validators.required],
            sex: ['',Validators.required],
            dob: [((new Date()).toLocaleDateString()),Validators.compose([ Validators.required, View.isDate])]
        });

    }
    form: FormGroup;
    private sub: any;
    static isDate(c: FormControl){
        if(!c.value.match(/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/))
            return {invalidDate:true};
    }
    sexArray: any[] = [{name: 'Male', val: 'M'},{name: 'Female', val: 'F'}];
    someList: Contact[] = [];
    contact:Contact = {_id:'', name: '',sex: '', dob: new Date()};
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            if(id){
                this.getContact(id);
            }
        });
    }
    getContact(id){
        this.contacts.get(id).subscribe(
            data => {
                this.contact._id = data._id;
                this.form.controls['name'].setValue(data.name);
                this.form.controls['sex'].setValue(data.sex);
                this.form.controls['dob'].setValue(data.dob.toLocaleDateString());
            },
            err => console.log(err));
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
        this.contacts.add(this.contact)
            .subscribe(x => this.router.navigate(['']),
            x => console.log(x));
    }
    save(){
        this.fillContactFromForm();
        this.contacts.save(this.contact)
            .subscribe(x => this.router.navigate(['']),
                x => console.log(x));

    }

}

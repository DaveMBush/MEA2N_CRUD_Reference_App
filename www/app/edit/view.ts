import { Component, OnInit }       from '@angular/core';
import {NgForm} from '@angular/common';
import {Contact} from "../interfaces/Contact";
import {Contacts} from "../services/Contacts";
import {RouteParams} from '@angular/router-deprecated';
import {Router} from '@angular/router-deprecated';
import {Control, FormBuilder, Validators, ControlGroup} from "@angular/common";
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl } from '@angular/forms';

@Component({
    templateUrl: 'app/edit/template.html',
    providers: [Contacts],
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class View implements OnInit {
    constructor(private contacts:Contacts,private routeParams:RouteParams, private router:Router,
                private formBuilder:FormBuilder){

         this.form = formBuilder.group({
            'name': ['',Validators.required],
             'sex': ['',Validators.required],
             'dob': [((new Date()).toLocaleDateString()),Validators.compose([ Validators.required, this.isDate])]
         });
    }
    form;
    isDate(c: Control){
        if(!c.value.match(/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/))
            return {invalidDate:true};
    }
    someList: Contact[] = [];
    contact:Contact = {_id:'', name: '',sex: '', dob: new Date()};
    ngOnInit() {
        let id = this.routeParams.get('id');
        if(id){
            this.getContact(id);
        }

    }
    getContact(id){
        this.contacts.get(id).subscribe(
            data => {
                this.contact._id = data._id;
                this.form.controls.name.updateValue(data.name);
                this.form.controls.sex.updateValue(data.sex);
                this.form.controls.dob.updateValue(data.dob.toLocaleDateString());
            },
            err => console.log(err));
    }
    cancel(){
        // something about calling navigate directly causes
        // the root page to completely refresh.  setTimeout
        // keeps it refreshing in place.  I suspect it has
        // something to do with the event still being
        // active?
       setTimeout(() => this.router.navigate(['/View']),1 );
    }
    fillContactFromForm(){
        this.contact.dob = new Date(this.form.controls.dob.value);
        this.contact.name = this.form.controls.name.value;
        this.contact.sex = this.form.controls.sex.value;
    }
    add(){
        this.fillContactFromForm();
        this.contacts.add(this.contact)
            .subscribe(x => this.router.navigate(['/View']),
            x => console.log(x));
    }
    save(){
        this.fillContactFromForm();
        this.contacts.save(this.contact)
            .subscribe(x => this.router.navigate(['/View']),
                x => console.log(x));

    }

}

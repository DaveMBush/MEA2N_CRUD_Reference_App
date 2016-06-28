import { Component, OnInit }       from '@angular/core';
import {NgForm} from '@angular/common';
import {Contact} from "../interfaces/Contact";
import {Contacts} from "../services/Contacts";
import {RouteParams} from '@angular/router-deprecated';
import {Router} from '@angular/router-deprecated';
import {Control, FormBuilder, Validators, ControlGroup} from "@angular/common";

@Component({
    templateUrl: 'app/edit/template.html',
    providers: [Contacts]
})
export class View implements OnInit {
    constructor(private contacts:Contacts,private routeParams:RouteParams, private router:Router,
                private formBuilder:FormBuilder){
        this.model = {
            name: '',
            sex: '',
            dob: ((new Date()).toLocaleDateString())
        };
         // this.form = formBuilder.group({
         //    'name': ['',Validators.required],
         //     'sex': ['',Validators.required],
         //     'dob': ['',Validators.compose([ Validators.required, this.isDate])]
         // });
    }
    isDate(c: Control){
        if(!c.value.match(/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/))
            return {invalidDate:true};
    }
    model;
    someList: Contact[] = [];
    contact:Contact = {_id:'', name: '',sex: '', dob: new Date()};
    ngOnInit() {
        let id = this.routeParams.get('id');
        if(id){
            this.getContact(id);
        } else {
            this.model.dob = ((new Date()).toLocaleDateString());
        }

    }
    getContact(id){
        this.contacts.get(id).subscribe(
            data => {
                this.contact._id = data._id;
                this.model.name = (data.name);
                this.model.sex = (data.sex);
                this.model.dob = (data.dob.toLocaleDateString());
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
        this.contact.dob = new Date(this.model.dob);
        this.contact.name = this.model.name;
        this.contact.sex = this.model.sex;
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

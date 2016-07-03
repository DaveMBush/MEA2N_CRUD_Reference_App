import { Component, OnInit }       from '@angular/core';
import {Contact} from "../interfaces/Contact";
import {Contacts} from "../services/Contacts";
import {Router} from '@angular/router';

@Component({
    templateUrl: 'app/view/template.html',
    providers: [Contacts]
})
export class View implements OnInit {
    constructor(private contacts:Contacts, private router:Router){}
    someList: Contact[] = [];
    ngOnInit() {
        this.getContacts();
    }
    getContacts(){
        this.contacts.list().subscribe(
            data => {
                this.someList = data;
            },
            err => console.log(err));
    }
    add(){
        this.router.navigate(['add']);
    }
    edit(id){
        this.router.navigate(['edit', id]);
    }
    remove(id){
        this.contacts.delete(id)
            .subscribe(
                x => this.getContacts());
    }
}

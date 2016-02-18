import { Component, OnInit }       from 'angular2/core';
import {Contact} from "../interfaces/Contact";
import {Contacts} from "../services/Contacts";
import {Router} from 'angular2/router';

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
        this.router.navigate(['Add']);
    }
    edit(id){
        this.router.navigate(['Edit',{id: id}]);
    }
    remove(id){
        this.contacts.delete(id)
            .subscribe(
                x => this.getContacts(),
                x => console.log(s));
    }
}

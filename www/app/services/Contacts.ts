import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Contact} from "../models/Contact";
import {Observable} from 'rxjs';

@Injectable()
export class Contacts {
    private baseUrl = '/api/contact/';
    headers: Headers = new Headers();
    constructor(public http: Http){
        // We don't seem to be able to inject this?!
        this.headers.append('Content-Type','application/json');
    }
    add(contact: Contact){
        return this.http.post(this.baseUrl,JSON.stringify(contact),{headers:this.headers})
            .map(x => x.json());
    }
    list(): Observable<Array<Contact>>{
        return this.http.get(this.baseUrl)
            .map(res => res.json())
            .map((contacts: Array<Contact>) => contacts );
    }
    get(id): Observable<Contact>{
        if(id < 0){
            return Observable.from([{_id:'', name: '',sex: '', dob: new Date(),phones:[]}])
                .map((contact: Contact)=> contact);
        }
        return this.http.get(this.baseUrl + id)
            .map(res =>{
                return res.json();
            })
            .map((contact: Contact) => {
                // the get returns the date as a string.
                //noinspection TypeScriptUnresolvedFunction
                contact.dob = <Date>new Date(contact.dob);
                return contact;
            });
    }
    save(contact: Contact){
        return this.http.post(this.baseUrl + contact._id,JSON.stringify(contact),{headers: this.headers})
            .map(res => res.json());
    }
    remove(id: number){
        return this.http.delete(this.baseUrl + id)
            .map(res=> res.json());
    }
}
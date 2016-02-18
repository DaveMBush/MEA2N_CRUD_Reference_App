/**
 * Created by dave on 2/17/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Contact} from "../interfaces/Contact";

@Injectable()

export class Contacts {
    private baseUrl = '/api/contact/';
    headers: Headers = new Headers();
    constructor(public http: Http){
        // We don't seem to be able to inject this?!
        this.headers.append('Content-Type','application/json');
    }
    add(contact){
        return this.http.post(this.baseUrl,JSON.stringify(contact),{headers:this.headers})
            .map(x => x.json());
    }
    public list(){
        return this.http.get(this.baseUrl)
            .map(res => res.json())
            .map((contacts: Array<any>) =>
            {
                contacts.forEach(contact => contact.dob = new Date(contact.dob));
                return contacts;
            });
    }
    get(id){
        return this.http.get(this.baseUrl + id)
            .map(res => res.json())
            .map(contact => {
                contact.dob = new Date(contact.dob);
                return contact;
            });
    }
    save(contact){
        return this.http.post(this.baseUrl + contact._id,JSON.stringify(contact),{headers: this.headers})
            .map(res => res.json());
    }
    delete(id){
        return this.http.delete(this.baseUrl + id)
            .map(res=> res.json());
    }
}
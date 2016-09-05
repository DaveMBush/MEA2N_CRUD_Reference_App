import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routes';
import { View } from './view/view';
import { View as Edit} from './edit/view';
import {TextField} from './components/textField/view';
import {DropdownField} from './components/dropdownField/view';



@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, routing , ReactiveFormsModule],
    declarations: [ TextField, DropdownField, View, Edit, AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

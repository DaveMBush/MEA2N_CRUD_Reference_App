import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routes';
import {EditModule} from "./edit/edit.module";
import {ViewModule} from './view/view.module';

@NgModule({
    imports:      [ BrowserModule, HttpModule, routing , EditModule, ViewModule],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

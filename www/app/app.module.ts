import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routes';
import {EditModule} from "./edit/edit.module";
import {ViewModule} from './view/view.module';
import { StoreModule } from '@ngrx/store';
import { ContactsReducer } from './state/reducers/ContactsReducer';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        routing ,
        EditModule,
        ViewModule,
        StoreModule.provideStore({contacts: ContactsReducer},[])
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

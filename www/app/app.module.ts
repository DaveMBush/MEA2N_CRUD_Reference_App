import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule}    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routes';
import { View } from './view/view';
import { View as Edit} from './edit/view';
import {ComponentsModule} from './components/components.module';

@NgModule({
    imports:      [ BrowserModule, HttpModule, routing , ReactiveFormsModule, ComponentsModule],
    declarations: [ View, Edit, AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

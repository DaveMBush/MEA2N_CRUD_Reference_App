import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routes';
import {EditModule} from "./edit/edit.module";
import {ViewModule} from './view/view.module';
import { StoreModule } from '@ngrx/store';
import { ContactsReducer } from './state/reducers/ContactsReducer';
import { ContactReducer } from './state/reducers/ContactReducer';
import { ContactsEffects } from './state/effects/ContactsEffects';
import { ContactEffects } from './state/effects/ContactEffects';
import {EffectsModule} from "@ngrx/effects";
import {Contacts} from "./services/Contacts";
import {PhonesReducer} from "./state/reducers/PhonesReducer";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing ,
        EditModule,
        ViewModule,
        StoreModule.provideStore(
            {
                contacts: ContactsReducer,
                contact: ContactReducer,
                phones: PhonesReducer
            },[]),
        EffectsModule.run(ContactsEffects),
        EffectsModule.run(ContactEffects)
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers: [Contacts]
})
export class AppModule { }

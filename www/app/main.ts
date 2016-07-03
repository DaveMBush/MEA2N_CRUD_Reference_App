import {bootstrap}    from '@angular/platform-browser-dynamic';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import {AppComponent} from './app.component';
import 'rxjs/Rx';
bootstrap(AppComponent,[
    disableDeprecatedForms(),
    provideForms(),
    APP_ROUTER_PROVIDERS
]);
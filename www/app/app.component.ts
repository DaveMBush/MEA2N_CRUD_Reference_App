import { Component }       from '@angular/core';
import {HTTP_PROVIDERS, Headers} from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { View } from './view/view';
import { View as Edit} from './edit/view';

@Component({
    selector: 'my-app',
    templateUrl: 'app/template.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS
    ],
    precompile: [View, Edit]
})
export class AppComponent {

}
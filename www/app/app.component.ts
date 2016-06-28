import { Component }       from '@angular/core';
import {HTTP_PROVIDERS, Headers} from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { View } from './view/view';
import { View as Edit} from './edit/view';

@RouteConfig([
    {
        path: '/',
        name: 'View',
        component: View,
        useAsDefault: true
    }, {
        path: '/edit/',
        name: 'Add',
        component: Edit
    }, {
        path: '/edit/:id',
        name: 'Edit',
        component: Edit
    }
])
@Component({
    selector: 'my-app',
    templateUrl: 'app/template.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS
    ]
})
export class AppComponent {

}
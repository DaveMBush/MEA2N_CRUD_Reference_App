import { provideRouter, RouterConfig } from '@angular/router';
import { View } from './view/view';
import { View as Edit} from './edit/view';

export const routes: RouterConfig = [
        {
            path: '',
            component: View,
        }, {
            path: 'add',
            component: Edit
        }, {
            path: 'edit/:id',
            component: Edit
        }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
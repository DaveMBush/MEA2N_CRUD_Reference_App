import { Routes, RouterModule } from '@angular/router';
import { View } from './view/view';
import { View as Edit} from './edit/view';

export const routes: Routes = [
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

export const routing = RouterModule.forRoot(routes);
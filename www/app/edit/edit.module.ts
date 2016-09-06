import {NgModule} from "@angular/core";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from '../components/components.module';
import {View as Edit} from './view';

@NgModule({
    imports:      [ReactiveFormsModule,FormsModule,CommonModule,ComponentsModule  ],
    declarations: [ Edit],
    exports:      [Edit]
})
export class EditModule { }

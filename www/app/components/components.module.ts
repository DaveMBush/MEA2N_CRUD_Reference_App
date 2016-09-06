import {NgModule} from "@angular/core";
import {TextField} from "./textField/view";
import {DropdownField} from "./dropdownField/view";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
    imports:      [ReactiveFormsModule,FormsModule,CommonModule  ],
    declarations: [ TextField, DropdownField ],
    exports: [TextField,DropdownField]
})
export class ComponentsModule { }

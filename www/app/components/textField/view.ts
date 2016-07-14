import { Component,forwardRef }       from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


const noop = () => {};
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextField),
    multi: true
    };

@Component({
    selector: 'text-field',
    moduleId: module.id,
    templateUrl: 'template.html',
    // turn off the require indicator on the hosting element.
    styles: [':host.ng-invalid {border:none;}'],
    directives: [REACTIVE_FORM_DIRECTIVES],
    inputs: ['fieldLabel', 'value', 'formControlName', 'required'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextField implements ControlValueAccessor{
    public fieldLabel: string;
    public formControlName: string;
    public required: boolean = false;
    //Placeholders for the callbacks
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_:any) => void = noop;

    writeValue(obj:any):void {
        this._value = obj;
    }

    //Set touched on blur
    onTouched(){
        this._onTouchedCallback();
    }
    registerOnChange(fn:any):void {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn:any):void {
        this._onTouchedCallback = fn;
    }
    private _value: string;
    set value(v){
        if (v !== this._value) {
            this._value = v;
            this._onChangeCallback(v);
        }    }
    get value(){
        return this._value;
    }
}

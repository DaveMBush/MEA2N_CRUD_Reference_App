import {Component, forwardRef}       from '@angular/core';
import {
    NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';


const noop = () => {};
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextField),
    multi: true
    };

@Component({
    selector: 'text-field',
    templateUrl: 'template.html',
    // turn off the require indicator on the hosting element.
    inputs: ['fieldLabel', 'value'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextField implements ControlValueAccessor{
    public fieldLabel: string;
    //Placeholders for the callbacks
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_:any) => void = noop;
    constructor(){

    }

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

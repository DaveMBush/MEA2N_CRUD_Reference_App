"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Contacts_1 = require("../services/Contacts");
var router_deprecated_1 = require('@angular/router-deprecated');
var router_deprecated_2 = require('@angular/router-deprecated');
var common_1 = require("@angular/common");
var forms_1 = require('@angular/forms');
var View = (function () {
    function View(contacts, routeParams, router, formBuilder) {
        this.contacts = contacts;
        this.routeParams = routeParams;
        this.router = router;
        this.formBuilder = formBuilder;
        this.someList = [];
        this.contact = { _id: '', name: '', sex: '', dob: new Date() };
        this.form = formBuilder.group({
            'name': ['', common_1.Validators.required],
            'sex': ['', common_1.Validators.required],
            'dob': [((new Date()).toLocaleDateString()), common_1.Validators.compose([common_1.Validators.required, this.isDate])]
        });
    }
    View.prototype.isDate = function (c) {
        if (!c.value.match(/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/))
            return { invalidDate: true };
    };
    View.prototype.ngOnInit = function () {
        var id = this.routeParams.get('id');
        if (id) {
            this.getContact(id);
        }
    };
    View.prototype.getContact = function (id) {
        var _this = this;
        this.contacts.get(id).subscribe(function (data) {
            _this.contact._id = data._id;
            _this.form.controls.name.updateValue(data.name);
            _this.form.controls.sex.updateValue(data.sex);
            _this.form.controls.dob.updateValue(data.dob.toLocaleDateString());
        }, function (err) { return console.log(err); });
    };
    View.prototype.cancel = function () {
        var _this = this;
        // something about calling navigate directly causes
        // the root page to completely refresh.  setTimeout
        // keeps it refreshing in place.  I suspect it has
        // something to do with the event still being
        // active?
        setTimeout(function () { return _this.router.navigate(['/View']); }, 1);
    };
    View.prototype.fillContactFromForm = function () {
        this.contact.dob = new Date(this.form.controls.dob.value);
        this.contact.name = this.form.controls.name.value;
        this.contact.sex = this.form.controls.sex.value;
    };
    View.prototype.add = function () {
        var _this = this;
        this.fillContactFromForm();
        this.contacts.add(this.contact)
            .subscribe(function (x) { return _this.router.navigate(['/View']); }, function (x) { return console.log(x); });
    };
    View.prototype.save = function () {
        var _this = this;
        this.fillContactFromForm();
        this.contacts.save(this.contact)
            .subscribe(function (x) { return _this.router.navigate(['/View']); }, function (x) { return console.log(x); });
    };
    View = __decorate([
        core_1.Component({
            templateUrl: 'app/edit/template.html',
            providers: [Contacts_1.Contacts],
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [Contacts_1.Contacts, router_deprecated_1.RouteParams, router_deprecated_2.Router, common_1.FormBuilder])
    ], View);
    return View;
}());
exports.View = View;
//# sourceMappingURL=view.js.map
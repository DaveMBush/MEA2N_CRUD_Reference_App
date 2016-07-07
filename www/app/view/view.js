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
var router_1 = require('@angular/router');
var View = (function () {
    function View(contacts, router) {
        this.contacts = contacts;
        this.router = router;
        this.someList = [];
    }
    View.prototype.ngOnInit = function () {
        this.getContacts();
    };
    View.prototype.getContacts = function () {
        var _this = this;
        this.contacts.list().subscribe(function (data) {
            _this.someList = data;
        }, function (err) { return console.log(err); });
    };
    View.prototype.add = function () {
        this.router.navigate(['add']);
    };
    View.prototype.edit = function (id) {
        this.router.navigate(['edit', id]);
    };
    View.prototype.remove = function (id) {
        var _this = this;
        this.contacts.delete(id)
            .subscribe(function (x) { return _this.getContacts(); });
    };
    View = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'template.html',
            providers: [Contacts_1.Contacts]
        }), 
        __metadata('design:paramtypes', [Contacts_1.Contacts, router_1.Router])
    ], View);
    return View;
}());
exports.View = View;
//# sourceMappingURL=view.js.map
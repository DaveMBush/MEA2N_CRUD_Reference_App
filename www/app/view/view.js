System.register(['angular2/core', "../services/Contacts", 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Contacts_1, router_1;
    var View;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Contacts_1_1) {
                Contacts_1 = Contacts_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            View = (function () {
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
                    this.router.navigate(['Add']);
                };
                View.prototype.edit = function (id) {
                    this.router.navigate(['Edit', { id: id }]);
                };
                View.prototype.remove = function (id) {
                    var _this = this;
                    this.contacts.delete(id)
                        .subscribe(function (x) { return _this.getContacts(); }, function (x) { return console.log(s); });
                };
                View = __decorate([
                    core_1.Component({
                        templateUrl: 'app/view/template.html',
                        providers: [Contacts_1.Contacts]
                    }), 
                    __metadata('design:paramtypes', [Contacts_1.Contacts, router_1.Router])
                ], View);
                return View;
            })();
            exports_1("View", View);
        }
    }
});
//# sourceMappingURL=view.js.map
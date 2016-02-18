System.register(['angular2/core', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var Contacts;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            Contacts = (function () {
                function Contacts(http) {
                    this.http = http;
                    this.baseUrl = '/api/contact/';
                    this.headers = new http_1.Headers();
                    // We don't seem to be able to inject this?!
                    this.headers.append('Content-Type', 'application/json');
                }
                Contacts.prototype.add = function (contact) {
                    return this.http.post(this.baseUrl, JSON.stringify(contact), { headers: this.headers })
                        .map(function (x) { return x.json(); });
                };
                Contacts.prototype.list = function () {
                    return this.http.get(this.baseUrl)
                        .map(function (res) { return res.json(); })
                        .map(function (contacts) {
                        contacts.forEach(function (contact) { return contact.dob = new Date(contact.dob); });
                        return contacts;
                    });
                };
                Contacts.prototype.get = function (id) {
                    return this.http.get(this.baseUrl + id)
                        .map(function (res) { return res.json(); })
                        .map(function (contact) {
                        contact.dob = new Date(contact.dob);
                        return contact;
                    });
                };
                Contacts.prototype.save = function (contact) {
                    return this.http.post(this.baseUrl + contact._id, JSON.stringify(contact), { headers: this.headers })
                        .map(function (res) { return res.json(); });
                };
                Contacts.prototype.delete = function (id) {
                    return this.http.delete(this.baseUrl + id)
                        .map(function (res) { return res.json(); });
                };
                Contacts = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], Contacts);
                return Contacts;
            })();
            exports_1("Contacts", Contacts);
        }
    }
});
//# sourceMappingURL=Contacts.js.map
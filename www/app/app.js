System.register(['angular2/core', 'angular2/http', 'angular2/router', './view/view', './edit/view'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, view_1, view_2;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (view_2_1) {
                view_2 = view_2_1;
            }],
        execute: function() {
            App = (function () {
                function App() {
                }
                App = __decorate([
                    router_1.RouteConfig([
                        {
                            path: '/',
                            name: 'View',
                            component: view_1.View,
                            useAsDefault: true
                        }, {
                            path: '/edit/',
                            name: 'Add',
                            component: view_2.View
                        }, {
                            path: '/edit/:id',
                            name: 'Edit',
                            component: view_2.View
                        }
                    ]),
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/template.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], App);
                return App;
            })();
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map
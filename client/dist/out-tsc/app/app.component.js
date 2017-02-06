var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Router } from '@angular/router';
var AppComponent = (function () {
    function AppComponent(router, auth) {
        this.router = router;
        this.auth = auth;
        this.title = 'project 7';
        this.isAuth = false;
    }
    AppComponent.prototype.refreshState = function (state) {
        this.isAuth = state;
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.auth.isAuthorized()) {
            this.refreshState(true);
        }
        this.auth.subscribe(function (state) {
            _this.refreshState(state);
        });
    };
    AppComponent.prototype.logout = function (event) {
        var _this = this;
        event.preventDefault();
        this.auth.logout()
            .subscribe(function (res) {
            console.log("logout success", res);
            _this.refreshState(false);
            _this.router.navigate(['/']);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    }),
    __metadata("design:paramtypes", [Router,
        AuthService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=../../../src/app/app.component.js.map
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
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { RegisterComponent } from './register/register.component';
var LoginComponent = (function () {
    function LoginComponent(router, dialog, auth) {
        this.router = router;
        this.dialog = dialog;
        this.auth = auth;
        this.cred = {
            email: "",
            password: ""
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.auth.isAuthorized()) {
        }
    };
    LoginComponent.prototype.doLogin = function () {
        var _this = this;
        if (this.cred.email && this.cred.password) {
            console.log(this.cred);
            this.auth.login(this.cred)
                .subscribe(function (res) {
                _this.router.navigate(['/dashboard']);
            }, function (err) {
                console.log("doLogin error", err);
            });
        }
    };
    LoginComponent.prototype.register = function () {
        var _this = this;
        var dialogRef = this.dialog.open(RegisterComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.auth.register(result)
                    .subscribe(function (res) {
                    _this.router.navigate(['/dashboard']);
                }, function (err) {
                    _this.register();
                });
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    }),
    __metadata("design:paramtypes", [Router,
        MdDialog,
        AuthService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=../../../../src/app/login/login.component.js.map
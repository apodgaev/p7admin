var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { apiUrls } from '../services/api-urls';
import { BackendService } from '../services/backend.service';
import { StorageService } from '../services/storage.service';
var AuthService = (function () {
    function AuthService(backend, ls) {
        this.backend = backend;
        this.ls = ls;
    }
    AuthService.prototype.parseToken = function (token) {
        var payload;
        payload = token.split('.')[1];
        payload = window.atob(payload);
        payload = JSON.parse(payload);
        this.user = payload;
        this.sessionToken = token;
        this.ls.save("token", token);
        this.backend.setAuthToken(token);
        return payload;
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        if (this.sessionToken) {
            return this.backend.post(apiUrls.auth.logout)
                .do(function (res) {
                if (res.OK) {
                    _this.ls.remove("token");
                    _this.sessionToken = "";
                    _this.backend.setAuthToken("");
                    _this.user = undefined;
                    _this.fireEvent();
                }
                return res;
            });
        }
    };
    AuthService.prototype.login = function (user) {
        var _this = this;
        return this.backend.post(apiUrls.auth.login, user)
            .do(function (res) {
            if (res && res.token) {
                _this.parseToken(res.token);
                _this.fireEvent();
            }
            return res;
        });
    };
    AuthService.prototype.register = function (user) {
        var _this = this;
        return this.backend.post(apiUrls.auth.register, user)
            .do(function (res) {
            _this.parseToken(res.token);
            _this.fireEvent();
            return res;
        });
    };
    AuthService.prototype.restoreToken = function () {
        var token = this.ls.load("token");
        if (token) {
            this.parseToken(token);
        }
    };
    AuthService.prototype.getSessionToken = function () {
        if (!this.sessionToken) {
            this.restoreToken();
        }
        return this.sessionToken;
    };
    AuthService.prototype.subscribe = function (cb) {
        this.appSubscriber = cb;
    };
    AuthService.prototype.fireEvent = function () {
        if (this.appSubscriber) {
            var state = this.isAuthorized();
            this.appSubscriber(state);
        }
    };
    AuthService.prototype.isAuthorized = function () {
        var token = this.getSessionToken();
        if (token) {
            var payload = this.parseToken(token);
            var isAuth = payload.exp > Date.now() / 1000;
            return isAuth;
        }
        else {
            return false;
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [BackendService,
        StorageService])
], AuthService);
export { AuthService };
//# sourceMappingURL=../../../../src/app/login/auth.service.js.map
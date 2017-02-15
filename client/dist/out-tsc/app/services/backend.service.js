var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
var AuthError = (function (_super) {
    __extends(AuthError, _super);
    function AuthError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.type = "Auth";
        return _this;
    }
    return AuthError;
}(Error));
export { AuthError };
var RequestType;
(function (RequestType) {
    RequestType[RequestType["GET"] = 0] = "GET";
    RequestType[RequestType["POST"] = 1] = "POST";
    RequestType[RequestType["PUT"] = 2] = "PUT";
    RequestType[RequestType["DELETE"] = 3] = "DELETE";
})(RequestType || (RequestType = {}));
var BackendService = (function () {
    function BackendService(http, _router, _snackBar) {
        this.http = http;
        this._router = _router;
        this._snackBar = _snackBar;
        this.token = "";
    }
    BackendService.prototype.openPopup = function (message) {
        this._snackBar.open(message, undefined, {
            duration: 2000,
        });
    };
    BackendService.prototype.responseWrapper = function (request) {
        var _this = this;
        return request.map(function (res) { return res.json(); })
            .map(function (res) {
            console.log("Request result:", res);
            if (res.error == -1) {
            }
            else {
                return res.data || res;
            }
        }).catch(function (error) {
            console.log("Request error:", error);
            var result;
            if (error.status == 401 || error.status == 0) {
                var message = error.json().message;
                message = (message) ? "Auth error: " + message : "Authorization failed!";
                _this.openPopup(message);
                result = Observable.throw(new AuthError(message));
                if (!_this._router.isActive('/', true)) {
                    _this._router.navigateByUrl('/');
                }
            }
            else {
                console.debug("error:", error);
                var message = error.statusText || 'Server error';
                _this.openPopup(message);
                result = Observable.throw(new Error(message));
            }
            return result;
        });
    };
    BackendService.prototype.setAuthToken = function (token) {
        this.token = token;
    };
    BackendService.prototype.request = function (method, url, options, body) {
        var _options = options;
        if (!_options) {
            _options = new RequestOptions({ headers: new Headers() });
        }
        _options.headers.append('Content-Type', 'application/json');
        if (this.token) {
            _options.headers.append('Authorization', 'Bearer ' + this.token);
        }
        var _body;
        if (body) {
            _body = (typeof body == "string") ? body : JSON.stringify(body);
        }
        var reqObservable;
        switch (method) {
            case RequestType.PUT:
                reqObservable = this.http.put(url, _body, _options);
                break;
            case RequestType.POST:
                reqObservable = this.http.post(url, _body, _options);
                break;
            case RequestType.DELETE:
                reqObservable = this.http.delete(url, _options);
                break;
            case RequestType.GET:
            default:
                reqObservable = this.http.get(url, _options);
                break;
        }
        return this.responseWrapper(reqObservable);
    };
    BackendService.prototype.post = function (url, body, options) {
        return this.request(RequestType.POST, url, options, body);
    };
    BackendService.prototype.get = function (url, options) {
        return this.request(RequestType.GET, url, options);
    };
    BackendService.prototype.put = function (url, body, options) {
        return this.request(RequestType.PUT, url, options, body);
    };
    BackendService.prototype.delete = function (url, body, options) {
        return this.request(RequestType.DELETE, url, options, body);
    };
    return BackendService;
}());
BackendService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        Router,
        MdSnackBar])
], BackendService);
export { BackendService };
//# sourceMappingURL=../../../../src/app/services/backend.service.js.map
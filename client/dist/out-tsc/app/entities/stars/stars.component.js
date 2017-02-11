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
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';
import { EntitiesService } from '../../services/entities.service';
var StarsComponent = (function () {
    function StarsComponent(entities, auth, router) {
        this.entities = entities;
        this.auth = auth;
        this.router = router;
        this.newItem = {
            name: "",
            description: ""
        };
        this.editNew = false;
    }
    StarsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.entities.getStars()
            .subscribe(function (res) {
            console.log("getStars result:", res);
            _this.stars = res;
        }, function (err) {
            if (err.type == "Auth") {
                _this.auth.clearToken();
                _this.router.navigateByUrl('/');
            }
        });
    };
    StarsComponent.prototype.select = function (star) {
        if (this.selectedStar && this.selectedStar._id == star._id) {
            this.selectedStar = undefined;
        }
        else {
            this.selectedStar = star;
        }
    };
    StarsComponent.prototype.startEdit = function (item) {
        if (item) {
        }
        else {
            this.editNew = true;
        }
    };
    StarsComponent.prototype.saveNew = function (item) {
        this.entities.createStar(item)
            .subscribe(function (res) {
            console.log("create star result:", res);
        });
    };
    return StarsComponent;
}());
StarsComponent = __decorate([
    Component({
        selector: 'app-stars',
        templateUrl: './stars.component.html',
        styleUrls: ['./stars.component.scss']
    }),
    __metadata("design:paramtypes", [EntitiesService,
        AuthService,
        Router])
], StarsComponent);
export { StarsComponent };
//# sourceMappingURL=../../../../../src/app/entities/stars/stars.component.js.map
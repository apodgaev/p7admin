var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Entity } from '../../models/entity';
var StarInfoComponent = (function () {
    function StarInfoComponent() {
        this.isEdit = false;
    }
    StarInfoComponent.prototype.ngOnInit = function () {
        console.log("star:", this.star);
    };
    StarInfoComponent.prototype.edit = function () {
        this.editModel = this.star.clone();
        this.isEdit = true;
        console.log("editModel:", this.editModel);
    };
    StarInfoComponent.prototype.cancel = function () {
        this.isEdit = false;
    };
    return StarInfoComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Entity)
], StarInfoComponent.prototype, "star", void 0);
StarInfoComponent = __decorate([
    Component({
        selector: 'star-info',
        templateUrl: './star-info.component.html',
        styleUrls: ['./star-info.component.scss']
    }),
    __metadata("design:paramtypes", [])
], StarInfoComponent);
export { StarInfoComponent };
//# sourceMappingURL=../../../../../../src/app/entities/stars/star-info/star-info.component.js.map
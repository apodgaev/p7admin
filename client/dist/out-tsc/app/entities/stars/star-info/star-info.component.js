var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var StarInfoComponent = (function () {
    function StarInfoComponent() {
        this.onCancel = new EventEmitter();
        this.onSave = new EventEmitter();
        this.onDelete = new EventEmitter();
        this.isEdit = false;
    }
    Object.defineProperty(StarInfoComponent.prototype, "star", {
        get: function () {
            return this._star;
        },
        set: function (_star) {
            console.log("set star", _star);
            this._star = _star;
            if (!_star._id)
                this.edit();
        },
        enumerable: true,
        configurable: true
    });
    StarInfoComponent.prototype.ngOnInit = function () {
        console.log("star:", this.star);
        if (!this.star._id)
            this.edit();
    };
    StarInfoComponent.prototype.edit = function () {
        this.editModel = this.star.clone();
        this.isEdit = true;
        console.log("editModel:", this.editModel);
    };
    StarInfoComponent.prototype.cancel = function () {
        this.isEdit = false;
        if (this.editModel.isEqual(this.star) && !this.star._id) {
            if (!!this.onCancel)
                this.onCancel.emit();
        }
    };
    StarInfoComponent.prototype.save = function () {
        if (!this.editModel.isEqual(this.star)) {
            if (!!this.onSave)
                this.onSave.emit(this.editModel);
        }
        this.isEdit = false;
    };
    StarInfoComponent.prototype.delete = function () {
        if (!!this.onDelete)
            this.onDelete.emit(this.star);
    };
    return StarInfoComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], StarInfoComponent.prototype, "star", null);
__decorate([
    Output('on-cancel'),
    __metadata("design:type", Object)
], StarInfoComponent.prototype, "onCancel", void 0);
__decorate([
    Output('on-save'),
    __metadata("design:type", Object)
], StarInfoComponent.prototype, "onSave", void 0);
__decorate([
    Output('on-delete'),
    __metadata("design:type", Object)
], StarInfoComponent.prototype, "onDelete", void 0);
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
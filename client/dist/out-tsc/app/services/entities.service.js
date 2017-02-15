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
import { BackendService } from './backend.service';
import { apiUrls } from './api-urls';
import { Entity } from '../entities/models/entity';
var EntitiesService = (function () {
    function EntitiesService(backend) {
        this.backend = backend;
    }
    EntitiesService.prototype.getStars = function () {
        return this.backend.get(apiUrls.stars).map(function (stars) {
            return stars.map(function (star) { return new Entity(star); });
        });
    };
    EntitiesService.prototype.createStar = function (star) {
        delete star._id;
        return this.backend.post(apiUrls.stars, star);
    };
    EntitiesService.prototype.saveStar = function (star) {
        return this.backend.put(apiUrls.star.replace(':id', star._id), star);
    };
    EntitiesService.prototype.deleteStar = function (star) {
        return this.backend.delete(apiUrls.star.replace(':id', star._id), star);
    };
    return EntitiesService;
}());
EntitiesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [BackendService])
], EntitiesService);
export { EntitiesService };
//# sourceMappingURL=../../../../src/app/services/entities.service.js.map
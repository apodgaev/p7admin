var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function cloneEntity(source) {
    var clone = new source.constructor(source);
    Object.defineProperties(clone, Object.keys(source).reduce(function (descriptors, key) {
        descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
        return descriptors;
    }, {}));
    return clone;
}
var DBEntity = (function () {
    function DBEntity(dbrecord) {
        Object.assign(this, dbrecord);
    }
    DBEntity.prototype.clone = function () {
        return cloneEntity(this);
    };
    return DBEntity;
}());
export { DBEntity };
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Entity;
}(DBEntity));
export { Entity };
//# sourceMappingURL=../../../../../src/app/entities/models/entity.js.map
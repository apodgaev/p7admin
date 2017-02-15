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
    function Entity(entity) {
        var _this = this;
        if (entity) {
            _this = _super.call(this, entity) || this;
        }
        else {
            _this = _super.call(this, {
                _id: 0,
                name: "New entity name",
                description: "New entity description"
            }) || this;
        }
        return _this;
    }
    Object.defineProperty(Entity.prototype, "properties", {
        get: function () {
            var self = this;
            var props = [];
            for (var p in self) {
                if (self.hasOwnProperty(p) && p != "_id" && p != "name" && p != "description") {
                    props.push({ name: p, value: self[p] });
                }
            }
            return props;
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.isEqual = function (source) {
        if (this._id != source._id)
            return false;
        if (this.name != source.name)
            return false;
        if (this.description != source.description)
            return false;
        return true;
    };
    return Entity;
}(DBEntity));
export { Entity };
var Star = (function (_super) {
    __extends(Star, _super);
    function Star(input) {
        return _super.call(this, input) || this;
    }
    return Star;
}(Entity));
export { Star };
//# sourceMappingURL=../../../../../src/app/entities/models/entity.js.map
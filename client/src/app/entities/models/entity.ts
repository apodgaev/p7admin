interface ICloneable {
	clone() : ICloneable
}

function cloneEntity(source: any) {
	let clone = new (<typeof source>source).constructor(source);
	Object.defineProperties(clone, Object.keys(source).reduce((descriptors, key) => {
		descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
		return descriptors;
	}, {}));
	return clone;
}

export class DBEntity implements ICloneable {
	constructor(dbrecord: Object) {
		Object.assign(this, dbrecord);
	}
	clone() : any {
		return cloneEntity(this);
	}
}

interface IEntity {
	_id : string,
	name : string
}

export class Entity extends DBEntity implements IEntity {
	_id : string;
	name : string;
	description: string;
}

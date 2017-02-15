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
	constructor(entity?: Object) {
		if(entity) {
			// parse existing
			super(entity);
		} else {
			// create new
			super({
				_id: 0,
				name: "New entity name",
				description: "New entity description"
			});
		}
	}
	get properties() {
		let self = this;
		let props = [];
		for(let p in self) {
			if(self.hasOwnProperty(p) && p != "_id" && p != "name" && p != "description") {
				props.push({name:p,value:self[p]});
			}
		}
		return props;
	}
	isEqual(source: Entity) : boolean {
		if(this._id != source._id) return false;
		if(this.name != source.name) return false;
		if(this.description != source.description) return false;
		return true;
	}
}

export class Star extends Entity {
	constructor(input?: Object) {
		super(input);
	}
}

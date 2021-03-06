import { DBEntity } from './base';

interface IEntity {
	_id : string,
	name : string,
	description : string
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
				_id: "0",
				name: "New entity",
				description: "Entity description"
			});
		}
	}
	get properties() {
		let self = this;
		let props = [];
		for(let p in self) {
			if(self.hasOwnProperty(p) && p !== "_id" && p !== "name" && p !== "description") {
				props.push({name:p,value:self[p]});
			}
		}
		return props;
	}
	isNew() : boolean {
		return this._id === "0";
	}
	isEqual(source: Entity) : boolean {
		if(this._id !== source._id) return false;
		if(this.name !== source.name) return false;
		if(this.description !== source.description) return false;
		return true;
	}
}

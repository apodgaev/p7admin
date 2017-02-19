import { DBEntity } from './base';

export class PlanetType extends DBEntity {
	_id : string;
	name : string;
	description : string;
	imageUrl : string;
	constructor(entity?: Object) {
		if(entity) {
			// parse existing
			super(entity);
		} else {
			// create new
			super({
				_id: 0,
				name: "New entity name",
				description: "New entity description",
				imageUrl: ""
			});
		}
	}
}

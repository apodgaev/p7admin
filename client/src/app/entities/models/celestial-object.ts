import { Entity } from './entity';

export class CelestialObject extends Entity {
	position : {
		radius : Number,
		angle : Number
	};
	constructor(input?: Object) {
		super(input);
	}
}

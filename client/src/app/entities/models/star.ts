import { Entity } from './entity';
import { CelestialObject } from './celestial-object';

export class Star extends Entity {

	orbits : CelestialObject[];
	
	constructor(input?: Object) {
		super(input);
		if(!input) {
			this.orbits = [];
		}
	}
}

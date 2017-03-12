import { Entity } from './entity';
import { CelestialObject } from './celestial-object';

export class Star extends Entity {

	orbits : CelestialObject[];

	constructor(input?: Object) {
		super(input);
		if(!input) {
			this.orbits = [];
		} else {
			if(input.hasOwnProperty("orbits") && input["orbits"].length > 0) {
				// TODO: make more intelligent builder distinguishing different types
				this.orbits = input["orbits"].map(obj => new CelestialObject(obj));
			}
		}
	}
}

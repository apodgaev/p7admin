import { Entity } from './entity';
import { CelestialObject } from './celestial-object';

class OrbitalObject extends CelestialObject {
	constructor(input?:{objectType:String,object:CelestialObject}) {
		if(input) super(input.object);
		else super();
	}
}

export class Star extends Entity {

	orbits : OrbitalObject[];

	constructor(input?: Object) {
		super(input);
		if(!input) {
			this.orbits = [];
		} else {
			if(input.hasOwnProperty("orbits") && input["orbits"].length > 0) {
				// TODO: make more intelligent builder distinguishing different types
				this.orbits = input["orbits"].map(obj => new OrbitalObject(obj));
			}
		}
	}
}

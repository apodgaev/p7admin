import { CelestialObject } from './celestial-object';
import { PlanetType } from './planet-type';

export class Planet extends CelestialObject {
	planetType : PlanetType;
	satellites: [CelestialObject];
	constructor(input?: Object) {
		super(input);
	}
}

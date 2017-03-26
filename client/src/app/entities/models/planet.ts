import { CelestialObject, CelestialObjectType } from './celestial-object';
import { PlanetType } from './planet-type';

export class Planet extends CelestialObject {
	planetType : PlanetType;
	satellites: CelestialObject[];
	constructor(input?: any) {
		super(input);
		if(!input) {
			this.planetType = null;
			this.satellites = [];
		}
		if(!this.objectType) {
			this.objectType = CelestialObjectType[CelestialObjectType.Planet];
		}
	}
}

import { Entity } from './entity';

export enum CelestialObjectType {
	Planet,
	AsteroidField
}

export const CelestialObjectTypes = [
	CelestialObjectType[CelestialObjectType.Planet],
	CelestialObjectType[CelestialObjectType.AsteroidField]
];

export class CelestialObject extends Entity {
	position : {
		radius : Number,
		angle : Number
	};
	constructor(input?: Object) {
		super(input);
		if(!input) {
			this.position = {
				radius : 1,
				angle : 0
			}
		}
	}
}

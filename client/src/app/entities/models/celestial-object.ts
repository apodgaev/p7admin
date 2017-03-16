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
	objectType: string;
	position : {
		radius : Number,
		angle : Number
	};
	constructor(input?: any) {
		super(input);
		this.position = (input) ? input.position : {radius : 1, angle : 0};
		this.objectType = (input) ? input.objectType : undefined;
	}
}

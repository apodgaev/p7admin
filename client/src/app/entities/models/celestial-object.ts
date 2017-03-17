import { Entity } from './entity';

export enum CelestialObjectType {
	Planet,
	AsteroidField
}

export const CelestialObjectTypes = [
	CelestialObjectType[CelestialObjectType.Planet],
	CelestialObjectType[CelestialObjectType.AsteroidField]
];

function isMongoRelation(o : any) : o is {objectType:String,object:CelestialObject} {
	return !!(o.object);
}

export class CelestialObject extends Entity {
	objectType: String;
	position : {
		radius : Number,
		angle : Number
	};
	constructor(input?: CelestialObject | {objectType:String,object:CelestialObject}) {
		if(input) {
			let _input = (isMongoRelation(input)) ? <CelestialObject>(input.object) : <CelestialObject>input;
			super(_input);
			this.position = _input.position;
			this.objectType = _input.objectType;
		} else {
			super(input);
			this.position = {radius : 1, angle : 0};
			this.objectType = undefined;
		}
	}
}

import { Component, OnInit, Input } from '@angular/core';
import { CelestialObject, CelestialObjectType, CelestialObjectTypes } from '../../../models/celestial-object';
import { Planet } from '../../../models/planet';
import { EntitiesService } from '../../../../services/entities.service';

@Component({
  selector: 'celestial-info',
  templateUrl: './celestial.component.html',
  styleUrls: ['./celestial.component.scss']
})
export class CelestialComponent implements OnInit {

	private editModel : CelestialObject;
	private isNew : boolean;
	private types;
	private cType;
	private title : string;
	private planetTypes;

  constructor(
		private entities: EntitiesService) { }

	@Input()
	get celestial() {
		return this.editModel.clone();
	}
	set celestial(input) {
		console.log("set Celestial", input);
		this.editModel = input.clone();
		this.title = this.editModel.name;
	}

  ngOnInit() {
		this.types = CelestialObjectTypes;
		console.log(this.types);
		this.entities.getPlanetTypeList()
      .subscribe(list => {
        this.planetTypes = list;
      });
  }

	private buildCelestial(type) {
		let celestialType = +CelestialObjectType[type];
		switch(celestialType) {
			case CelestialObjectType.Planet:
				return new Planet(this.editModel);
		}
	}
	typeChange() {
		this.editModel = this.buildCelestial(this.cType);
		console.log("model:", this.editModel);
	}

	save() {
		//this.dialogRef.close(this.editModel);
	}
}

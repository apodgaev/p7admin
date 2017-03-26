import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
	private typeMap;
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
		this.cType = this.editModel.objectType;
		this.typeMap = CelestialObjectType;
	}

  ngOnInit() {
		this.types = CelestialObjectTypes;
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

	@Output('on-save') onSave = new EventEmitter();
	save() {
		if(!!this.onSave) this.onSave.emit(this.editModel);
	}

	@Output('on-cancel') onCancel = new EventEmitter();
	cancel() {
		if(!!this.onCancel) this.onCancel.emit();
	}
}

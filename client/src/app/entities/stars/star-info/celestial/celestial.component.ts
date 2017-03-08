import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSelectChange } from '@angular/material';
import { CelestialObject, CelestialObjectType, CelestialObjectTypes } from '../../../models/celestial-object';
import { Planet } from '../../../models/planet';

@Component({
  selector: 'app-celestial',
  templateUrl: './celestial.component.html',
  styleUrls: ['./celestial.component.scss']
})
export class CelestialComponent implements OnInit {

	private editModel : CelestialObject;
	private isNew : boolean;
	private types;
	private cType;
	private title : string;

  constructor(public dialogRef: MdDialogRef<CelestialComponent>) { }

  ngOnInit() {
		this.types = CelestialObjectTypes;
		console.log(this.types);
		let input = this.dialogRef.config.data;
		console.log("input data:", input);
		if(input) {
			this.editModel = input;
		} else {
			this.isNew = true;
			this.editModel = new CelestialObject();
		}
		this.title = (this.isNew) ? "New Celestial Object" : this.editModel.name;
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
		this.dialogRef.close(this.editModel);
	}
}

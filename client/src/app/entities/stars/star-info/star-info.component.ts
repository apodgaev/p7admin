import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntitiesService } from '../../../services/entities.service';
import { Entity } from '../../models/entity';
import { Star } from '../../models/star';
import { CelestialObject, CelestialObjectType, CelestialObjectTypes } from '../../models/celestial-object';
import { Planet } from '../../models/planet';

@Component({
  selector: 'star-info',
  templateUrl: './star-info.component.html',
  styleUrls: ['./star-info.component.scss']
})
export class StarInfoComponent implements OnInit {

	private isEdit;

	private _star : Star;
	@Input()
	get star() {
		return this._star;
	}
	set star(_star) {
		this._star = _star;
		if(_star.isNew()) this.edit();
	}

	private editModel : Star;

  constructor(private entities: EntitiesService) {
		this.isEdit = false;
	}

  ngOnInit() {
		console.log("star:", this.star);
		// turn edit mode on for new entities
		if(!this.star._id) this.edit();
		this.types = CelestialObjectTypes;
  }

	edit() {
		this.editModel = this.star.clone();
		this.isEdit = true;
		console.log("editModel:", this.editModel);
	}

	@Output('on-cancel') onCancel = new EventEmitter();
  cancel() {
		if(this.selectedCelestial) {
			this.selectedCelestial = undefined;
		} else {
			this.isEdit = false;
			if(this.editModel.isEqual(this.star) && this.star.isNew()) {
				if(!!this.onCancel) this.onCancel.emit();
			}
		}
	}

	@Output('on-save') onSave = new EventEmitter();
	save() {
		if(this.selectedCelestial) {
			console.log(this.selectedCelestial);
			if(!this.selectedCelestial.isEqual(this._selectedCelestial)) {
				// TODO: add support for update
				let star = this.editModel.clone();
				star.orbits.push(this.selectedCelestial);
				this.editModel = star;
				if(!!this.onAdd) this.onAdd.emit(this.selectedCelestial);
			}
		} else {
			if(!this.editModel.isEqual(this.star)) {
				if(!!this.onSave) this.onSave.emit(this.editModel);
			}
			this.isEdit = false;
		}
	}

	@Output('on-delete') onDelete = new EventEmitter();
	delete() {
		if(!!this.onDelete) this.onDelete.emit(this.star);
	}

	private selectedCelestial : CelestialObject;
	private _selectedCelestial : CelestialObject;
	private celestialType;
	private planetTypes;
	private types;

	selectCelestial(celestial) {
		console.log("celestial", celestial)
		this.selectedCelestial = celestial.clone();
		this._selectedCelestial = celestial;
	}

	createCelestial() {
		this.selectedCelestial = new CelestialObject();
	}

	private buildCelestial(type, celestial) {
		console.log("buildCelestial", type);
		let celestialType = +CelestialObjectType[type];
		switch(celestialType) {
			case CelestialObjectType.Planet:
				if(!this.planetTypes)
				this.entities.getPlanetTypeList()
					.subscribe(list => {
						this.planetTypes = list;
					});
				return new Planet(celestial);
		}
	}
	typeChange() {
		this.selectedCelestial = this.buildCelestial(this.celestialType, this.selectedCelestial);
		this._selectedCelestial = this.buildCelestial(this.celestialType, this._selectedCelestial);
		console.log("model:", this.selectedCelestial);
	}



	@Output('on-add') onAdd = new EventEmitter();
	addOrbit(event) {
		/*
		let dialogRef = this.dialog.open(CelestialComponent);
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
				let star = <Star>(this.editModel.clone());
				star.orbits.push(result);
				this.editModel = star;
				if(!!this.onAdd) this.onAdd.emit(result);
			}
    });
		*/
	}

}

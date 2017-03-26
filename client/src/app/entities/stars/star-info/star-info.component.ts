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

	@Output('on-edit') onEdit = new EventEmitter();
	edit() {
		this.editModel = this.star.clone();
		this.isEdit = true;
		if(!!this.onEdit) this.onEdit.emit();
	}

	@Output('on-cancel') onCancel = new EventEmitter();
  cancel() {
		if(this.selectedCelestial) {
			this.selectedCelestial = undefined;
		} else {
			this.isEdit = false;
			this.editModel = undefined;
			console.log("cancel");
			if(!!this.onCancel) this.onCancel.emit();
		}
	}

	@Output('on-save') onSave = new EventEmitter();
	save(editedModel) {
		if(this.selectedCelestial) {
			console.log(this.selectedCelestial, editedModel);
			if(editedModel && !editedModel.isEqual(this.selectedCelestial)) {
				console.log("save celestial found");
				let star = this.editModel.clone();
				if(editedModel.isNew()) {
					star.orbits.push(editedModel);
					console.log("saving star with new celestial");
					if(!!this.onAdd) this.onAdd.emit(editedModel);
				} else {
					// TODO: add support for update

				}
				this.editModel = star;
				this.selectedCelestial = undefined;
			} else {
				console.warn("CelestialObject was not changed!");
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
	}

	cancelCelestial() {
		console.log("cancelCelestial");
		this.selectedCelestial = undefined;
	}

	createCelestial() {
		this.selectedCelestial = new CelestialObject();
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

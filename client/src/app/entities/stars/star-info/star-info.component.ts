import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Entity } from '../../models/entity';
import { Star } from '../../models/star';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CelestialComponent } from './celestial/celestial.component';
import { CelestialObject } from '../../models/celestial-object';

@Component({
  selector: 'star-info',
  templateUrl: './star-info.component.html',
  styleUrls: ['./star-info.component.scss']
})
export class StarInfoComponent implements OnInit {

	private isEdit;

	private _star : Entity;
	@Input()
	get star() {
		return this._star;
	}
	set star(_star) {
		console.log("set star", _star);
		this._star = _star;
		if(!_star._id) this.edit();
	}

	private editModel : Entity;

  constructor(public dialog: MdDialog) {
		this.isEdit = false;
	}

  ngOnInit() {
		console.log("star:", this.star);
		// turn edit mode on for new entities
		if(!this.star._id) this.edit();
  }

	edit() {
		this.editModel = this.star.clone();
		this.isEdit = true;
		console.log("editModel:", this.editModel);
	}

	@Output('on-cancel') onCancel = new EventEmitter();
  cancel() {
		this.isEdit = false;
		if(this.editModel.isEqual(this.star) && !this.star._id) {
			if(!!this.onCancel) this.onCancel.emit();
		}
	}

	@Output('on-save') onSave = new EventEmitter();
	save() {
		if(!this.editModel.isEqual(this.star)) {
			if(!!this.onSave) this.onSave.emit(this.editModel);
		}
		this.isEdit = false;
	}

	@Output('on-delete') onDelete = new EventEmitter();
	delete() {
		if(!!this.onDelete) this.onDelete.emit(this.star);
	}

	@Output('on-add') onAdd = new EventEmitter();
	addOrbit(event) {
		let dialogRef = this.dialog.open(CelestialComponent);
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
				/*
				let celestial = result.clone();
				celestial._id = undefined;
				console.log("celestial", celestial);
				this.editModel = <Star>(this.star.clone());
				(<Star>this.editModel).orbits.push(celestial);
				console.log("star", this.editModel);
				*/
				if(!!this.onAdd) this.onAdd.emit(result);
			}
    });
	}

}

import { Component, OnInit, Input } from '@angular/core';

import { Entity } from '../../models/entity';

@Component({
  selector: 'star-info',
  templateUrl: './star-info.component.html',
  styleUrls: ['./star-info.component.scss']
})
export class StarInfoComponent implements OnInit {

	private isEdit;
	@Input()
  star : Entity;
	private editModel : Entity;

  constructor() {
		this.isEdit = false;
	}

  ngOnInit() {
		console.log("star:", this.star);
  }

	edit() {
		this.editModel = this.star.clone();
		this.isEdit = true;
		console.log("editModel:", this.editModel);
	}

	cancel() {
		this.isEdit = false;
	}
}

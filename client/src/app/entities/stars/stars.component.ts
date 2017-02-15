import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';
import { EntitiesService } from '../../services/entities.service';

import { Entity } from '../models/entity';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
	private stars : any[];
	private selectedStar;

  constructor(
		private entities : EntitiesService,
		private auth : AuthService,
		private router : Router) {
	}

	loadStars() {
		this.entities.getStars()
			.subscribe(res => {
				console.log("getStars result:", res);
				this.stars = res;
			}, err => {
				if (err.type == "Auth") {
					this.auth.clearToken();
					this.router.navigateByUrl('/');
				}
			});
	}

  ngOnInit() {
		this.loadStars();
  }

  select(star) {
		if(this.selectedStar && this.selectedStar._id == star._id) {
			this.selectedStar = undefined;
		} else {
			this.selectedStar = star;
		}
	}

	create() {
		this.selectedStar = new Entity();
	}

	save(star) {
		console.log("save", star);
		if(star._id) {
			this.entities.saveStar(star)
			.subscribe(res => {
				console.log("save star result:", res);
				this.selectedStar = new Entity(res);
				this.loadStars();
			});
		} else {
			this.entities.createStar(star)
			.subscribe(res => {
				console.log("create star result:", res);
				this.selectedStar = new Entity(res);
				this.loadStars();
			});
		}
	}

	cancel() {
		this.selectedStar = undefined;
	}

	delete(star) {
		console.log("delete star", star);
		this.entities.deleteStar(star)
		.subscribe(res => {
			console.log("delete star result:", res);
			this.selectedStar = undefined;
			this.loadStars();
		});
	}
}

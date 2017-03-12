import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';
import { EntitiesService } from '../../services/entities.service';

import { Star } from '../models/star';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
  private stars: Star[];
  private selectedStar;

  constructor(
    private entities: EntitiesService,
    private auth: AuthService,
    private router: Router) {
  }

  loadStars() {
    this.entities.getStars()
      .subscribe(res => {
        this.stars = res;
      }, err => {
        console.error("Error:", err);
      });
  }

  ngOnInit() {
    this.loadStars();
  }

  select(star) {
    if (this.selectedStar && this.selectedStar._id == star._id) {
      this.selectedStar = undefined;
    } else {
      this.selectedStar = star;
    }
  }

  create() {
    this.selectedStar = new Star();
  }

  save(star) {
    if (star._id) {
      this.entities.saveStar(star)
        .subscribe(res => {
          this.selectedStar = new Star(res);
          this.loadStars();
        });
    } else {
      this.entities.createStar(star)
        .subscribe(res => {
          this.selectedStar = new Star(res);
          this.loadStars();
        });
    }
  }

	addOrbit(planet) {
		this.entities.addPlanet(this.selectedStar, planet)
			.subscribe(res => {
				console.log("result", res);
				//this.selectedStar = new Entity(res);
				this.loadStars();
			});
	}

  cancel() {
    this.selectedStar = undefined;
  }

  delete(star) {
    this.entities.deleteStar(star)
      .subscribe(res => {
        this.selectedStar = undefined;
        this.loadStars();
      });
  }
}

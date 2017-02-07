import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';
import { EntitiesService } from '../../services/entities.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
	private stars : any[];
	private newItem;
	private editNew : boolean;

  constructor(
		private entities : EntitiesService,
		private auth : AuthService,
		private router : Router) {
		this.newItem = {
			name: "",
			description: ""
		};
		this.editNew = false;
	}

  ngOnInit() {
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

	startEdit(item) {
		if(item) {

		} else {
			this.editNew = true;
		}
	}

	saveNew(item) {
		this.entities.createStar(item)
		.subscribe(res => {
			console.log("create star result:", res);
		})
	}
}

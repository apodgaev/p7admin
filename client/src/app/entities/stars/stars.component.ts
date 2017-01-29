import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../../services/entities.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
	private stars : any[];

  constructor(private entities : EntitiesService) { }

  ngOnInit() {
		this.entities.getStars()
			.subscribe(res => {
				console.log("getStars result:", res);
				this.stars = res;
			});
  }

}

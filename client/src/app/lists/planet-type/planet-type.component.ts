import { Component, OnInit } from '@angular/core';
import { PlanetType } from '../../entities/models/planet-type';
import { EntitiesService } from '../../services/entities.service';

@Component({
  selector: 'app-planet-type',
  templateUrl: './planet-type.component.html',
  styleUrls: ['./planet-type.component.scss']
})
export class PlanetTypeComponent implements OnInit {

  private planetTypes: [PlanetType];
  private selectedItem: PlanetType;

  constructor(
    private entities: EntitiesService
  ) { }

  private loadList() {
    this.entities.getPlanetTypeList()
      .subscribe(list => {
        this.planetTypes = list;
      });
  }

  ngOnInit() {
    this.loadList();
  }

  select(item: PlanetType) {
    this.selectedItem = item;
  }

  create() {
    this.selectedItem = new PlanetType();
  }

  save() {
    if (this.selectedItem) {
      this.entities.savePlanetType(this.selectedItem)
        .subscribe(res => {
          this.selectedItem = new PlanetType(res);
          this.loadList();
        });
    }
  }

	cancel() {
		this.selectedItem = undefined;
	}

	delete() {
		this.entities.deletePlanetType(this.selectedItem)
		.subscribe(res => {
			this.cancel();
			this.loadList();
		});
	}
}

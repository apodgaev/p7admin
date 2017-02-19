import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { apiUrls } from './api-urls';
import { ListsService } from './lists.service';

import { Entity } from '../entities/models/entity';
import { PlanetType } from '../entities/models/planet-type';

@Injectable()
export class EntitiesService {

  constructor(
		private backend: BackendService,
		private lists: ListsService
	) { }

	public getStars() {
		return this.backend.get(apiUrls.stars).map(stars => {
			return stars.map(star => new Entity(star));
		});
	}

	public createStar(star) {
		delete star._id;
		return this.backend.post(apiUrls.stars, star);
	}

	public saveStar(star : Entity) {
		return this.backend.put(apiUrls.star.replace(':id', star._id), star);
	}

	public deleteStar(star: Entity) {
		return this.backend.delete(apiUrls.star.replace(':id', star._id));
	}

	public getPlanetTypeList() {
		return this.lists.getList('planetType').map(list => {
			return list.map(item => new PlanetType(item));
		});
	}

	public savePlanetType(item) {
		if(!item._id) {
			delete item._id;
			return this.lists.addItem('planetType', item);
		} else {
			return this.lists.updateItem('planetType', item);
		}
	}

	public deletePlanetType(item) {
		return this.lists.deleteItem('planetType', item);
	}
}

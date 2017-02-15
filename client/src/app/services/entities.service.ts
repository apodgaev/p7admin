import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { apiUrls } from './api-urls';

import { Entity } from '../entities/models/entity';

@Injectable()
export class EntitiesService {

  constructor(private backend: BackendService) { }

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
		return this.backend.delete(apiUrls.star.replace(':id', star._id), star);
	}
}

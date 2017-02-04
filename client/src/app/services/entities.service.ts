import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { apiUrls } from './api-urls';

@Injectable()
export class EntitiesService {

  constructor(private backend: BackendService) { }

	public getStars() {
		return this.backend.get(apiUrls.stars);
	}

	public createStar(star) {
		return this.backend.post(apiUrls.stars, star);
	}
}

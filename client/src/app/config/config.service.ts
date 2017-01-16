import { Injectable } from '@angular/core';
import { apiUrls } from '../services/api-urls';
import { BackendService } from '../services/backend.service';

@Injectable()
export class ConfigService {

  constructor(private backend: BackendService) { }

	public setConfig(config) {
		return this.backend.post(apiUrls.setConfig, config);
	}
}

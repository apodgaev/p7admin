import { Injectable } from '@angular/core';
import { apiUrls } from '../services/api-urls';
import { BackendService } from '../services/backend.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthService {

  constructor(
		private backend: BackendService,
		private ls: StorageService
	) { }

	public login(user) {
		return this.backend.post(apiUrls.auth.login, user);
	}

	public register(user) {
		return this.backend.post(apiUrls.auth.register, user);
	}

	public isAuthorized() {
		return false;
	}
}

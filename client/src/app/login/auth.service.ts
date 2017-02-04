import { Injectable } from '@angular/core';
import { apiUrls } from '../services/api-urls';
import { BackendService } from '../services/backend.service';

@Injectable()
export class AuthService {

  constructor(private backend: BackendService) { }

	public login(user) {
		return this.backend.post(apiUrls.auth.login, user);
	}

	public register(user) {
		return this.backend.post(apiUrls.auth.register, user);
	}
}

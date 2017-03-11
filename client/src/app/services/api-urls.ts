import { environment } from "../../environments/environment";

let srv = environment.apiUrl + "/api";

console.log("apiURL init:", srv);

export const apiUrls = {
	auth: {
		login: srv + "/auth/login",
		register: srv + "/auth/register",
		logout: srv + "/auth/logout"
	},
	wrongUrl: srv + "/somethingbad",
	setConfig : srv + "/config",
	stars : srv + "/stars",
	star: srv + "/stars/:id",
	planet: srv + "/stars/:id/planet",
	lists: {
		planetType: srv + "/lists/planet-type"
	}
};

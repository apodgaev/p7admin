import { environment } from "../../environments/environment";

let srv = environment.apiUrl + "/api";

console.log("apiURL init:", srv);

export const apiUrls = {
	auth: {
		login: srv + "/login",
		register: srv + "/register"
	},
	wrongUrl: srv + "/somethingbad",
	setConfig : srv + "/config",
	stars : srv + "/stars"
};

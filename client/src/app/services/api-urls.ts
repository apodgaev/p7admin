import { environment } from "../../environments/environment";

let srv = environment.apiUrl + "/api";

console.log("apiURL init:", srv);

export const apiUrls = {
	wrongUrl: srv + "/somethingbad",
	setConfig : srv + "/config"
};

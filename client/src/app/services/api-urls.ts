import { environment } from "../../environments/environment";

let srv = environment.apiUrl;

console.log("apiURL:", srv);

export const apiUrls = {
	setConfig : srv + "/config"
};

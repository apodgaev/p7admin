import { environment } from "../../environments/environment";
var srv = environment.apiUrl + "/api";
console.log("apiURL init:", srv);
export var apiUrls = {
    auth: {
        login: srv + "/auth/login",
        register: srv + "/auth/register",
        logout: srv + "/auth/logout"
    },
    wrongUrl: srv + "/somethingbad",
    setConfig: srv + "/config",
    stars: srv + "/stars",
    star: srv + "/stars/:id"
};
//# sourceMappingURL=../../../../src/app/services/api-urls.js.map
import {BrowserXhr} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class CORSBrowserXHR extends BrowserXhr{
    build(): any{
        var xhr:any = super.build();
        xhr.withCredentials = true;
        return xhr;
    }
}

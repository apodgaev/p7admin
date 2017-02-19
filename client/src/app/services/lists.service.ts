import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { apiUrls } from './api-urls';

@Injectable()
export class ListsService {

	constructor(private backend: BackendService) { }

	getList(listName: string) {
		return this.backend.get(apiUrls.lists[listName]);
	}

	addItem(listName: string, item : any) {
		return this.backend.post(apiUrls.lists[listName], item);
	}

	updateItem(listName: string, item : any) {
		return this.backend.put(apiUrls.lists[listName] + '/' + item._id, item);
	}

	deleteItem(listName: string, item : any) {
		return this.backend.delete(apiUrls.lists[listName] + '/' + item._id);
	}
}

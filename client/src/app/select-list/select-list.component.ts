import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent {

	private minify : boolean;

  constructor() { }

	@Input()
	public header : string;

	@Input()
	public disabled : boolean;

	@Input()
	public items : any[];

	@Input('selected-item')
	public selectedItem : any;

	@Output('on-select') onSelect = new EventEmitter();
	select(item) {
		if(!this.disabled && !item.disabled && !!this.onSelect) this.onSelect.emit(item);
	}

	@Output('on-add') onAdd = new EventEmitter();
	add() {
		if(!this.disabled && !!this.onAdd) this.onAdd.emit();
	}

}

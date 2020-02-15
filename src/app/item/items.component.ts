import { Component, OnInit } from '@angular/core';

import { Item } from './item';
import { ItemService } from './item.service';
import { Store } from '@ngxs/store';
import { Logout } from '../shared/state/auth.actions';

@Component({
    selector: 'ns-items',
    templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private itemService: ItemService, private store: Store) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    logout() {
        this.store.dispatch(new Logout());
    }
}

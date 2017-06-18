import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item-service';
import { Item } from './item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  type: string;
  name: string;

  searchType: string;
  searchValue: string;

  items: Item[];
  currentPage: number;
  itemsFullSize: number;

  ngOnInit() {
  }

  getItemsByType() {
    if(this.type) {
      this.searchValue = this.type;
      this.currentPage = 1;
      this.itemService.getItemsByType(this.searchValue, this.currentPage).then(items => {
        this.items = items;
        console.log(this.items.length);
      });
      this.itemService.getItemsByTypeCount(this.searchValue).then(fullSize => this.itemsFullSize = fullSize);
    }
    else {
      console.log("item type is empty..");
    }
  }

  getMoreItemsByType() {
    if(this.items && this.items.length < this.itemsFullSize) {
      this.currentPage++;
      this.itemService.getItemsByType(this.searchValue, this.currentPage).then(items => {
        this.items.concat(items);
        console.log(this.items.length);
      });
    }
  }

  getItemsByName() {
    if(this.name) {
      this.searchValue = this.name;
      this.currentPage = 1;
      this.itemService.getItemsByName(this.searchValue, this.currentPage).then(items => {
        this.items = items;
        console.log(this.items.length);
      });
      this.itemService.getItemsByNameCount(this.searchValue).then(fullSize => this.itemsFullSize = fullSize);
    }
    else {
      console.log("item type is empty..");
    }
  }

  getMoreItemsByName() {
    if(this.items && this.items.length < this.itemsFullSize) {
      this.currentPage++;
      this.itemService.getItemsByName(this.searchValue, this.currentPage).then(items => {
        this.items.push(...items);
        console.log(this.items.length);
      });
    }
  }
}

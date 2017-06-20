import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item-service';
import { PingService } from '../ping.service';
import { Item } from './item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private itemService: ItemService, private pingService: PingService) {
    this.pingService.pingStream.subscribe(ping => {
      this.ping = ping;
      this.avg_ping_sum += ping;
      this.ping_count ++;
      this.avg_ping = this.avg_ping_sum / this.ping_count;
      if(ping > this.avg_ping * 2) {
        this.bad_ping_count ++;
      }
    });
    this.pingService.ipStream.subscribe(ip => this.ipAddress = ip);
  }

  type: string;
  name: string;

  ipAddress: string = '';

  ping: number = 0;
  ping_count: number = 0;

  avg_ping_sum: number = 0;
  avg_ping: number = 0;
  bad_ping_count: number = 0;

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

import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Item} from './home/item'


@Injectable()
export class ItemService {

  private api_url_type  = '/api/items/type/'
  private api_url_type_count  = '/api/items/type/count/'
  private api_url_name  = '/api/items/name/'
  private api_url_name_count  = '/api/items/name/count/'
  private api_url_item_type = '/api/items/types'


  constructor(private http: Http) { }

  getItemsByType(type: string, page: number): Promise<Item[]> {
    return this.http.get(this.api_url_type + type + "/" + page).toPromise().then(r => <any[]>r.json().data.map(json => Item.fromJSON(json)));
    
  }
  getItemsByTypeCount(type: string): Promise<number> {
    return this.http.get(this.api_url_type_count + type).toPromise().then(r => r.json().count);
  }

  getItemsByName(name: string, type: string, page: number): Promise<Item[]> {
    return this.http.get(this.api_url_name + type + "/" +  name + "/" + page).toPromise().then(r => <any[]>r.json().data.map(json => Item.fromJSON(json)));
  }

  getItemsByNameCount(name: string, type: string): Promise<number> {
    return this.http.get(this.api_url_name_count + type + "/" + name).toPromise().then(r => r.json().count);
  }
  getItemType(): Promise<string[]> {
    return this.http.get(this.api_url_item_type).toPromise().then(r => r.json().types);
  }
}

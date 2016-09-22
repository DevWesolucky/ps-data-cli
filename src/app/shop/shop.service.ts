import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API_ENDPOINT } from '../shared/global-constants';
import { Shop } from './domain/shop';
import { Logger } from '../shared/logger';

@Injectable()
export class ShopService 
{

  constructor(private http: Http) { }

  /**
   * Get all shops list.
   * 
   * @return Observable with array of shops
   */
  public getShopsList():Observable<Shop[]>
  {
    return this.http.get(API_ENDPOINT + "/shops")
                    .map(this.extractData);
  }

  /**
   * Create or update shop.
   * If shop id == 0 save new shop, else update existing one.
   * 
   * @param Shop object from form data
   * @return Observable with saved shop
   */
  public updateShop (shop:Shop):Observable<Shop> 
  {
    let body = JSON.stringify(shop);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // POST: create new
    if (shop.id == 0)
    {
      return this.http.post(API_ENDPOINT + "/shops", body, options)
                      .map(this.extractData);
    }

    // PUT: update existing shop
    return this.http.put(API_ENDPOINT + "/shops", body, options)
                    .map(this.extractData);

  }

  /**
   * Get single shop by id.
   * 
   * @param shop id.
   * @return Observable with shop instance
   */
  public deleteShop(id:number):Observable<any> 
  {
    Logger.debug("ShopService.getShopById > id: " + id);
    return this.http.delete(API_ENDPOINT + "/shops/" + id)
                    .map(this.extractData);
  }

  /**
   * Get single shop by id.
   * 
   * @param shop id.
   * @return Observable with shop instance
   */
  public getShopById(id:number):Observable<Shop> 
  {
    Logger.debug("ShopService.getShopById > id: " + id);
    return this.http.get(API_ENDPOINT + "/shops/" + id)
                    .map(this.extractData);
  }


  private extractData(response:Response):any
  {
    let body = response.json();
    return body || { };
  }

}

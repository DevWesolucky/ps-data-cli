import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { API_ENDPOINT } from '../shared/global-constants';
import { Product } from './domain/product';

@Injectable()
export class ProductService 
{

  constructor(private http: Http) { }

  /**
   * Get all products by shop ID.
   * 
   * @param id The id of selected shop
   * @return Observable with array of products
   */
  public getAllProductsByShopId(shopId:number):Observable<Product[]>
  {
    return this.http.get(API_ENDPOINT + "/products/shop/" + shopId)
                    .map(this.extractData);
  }

  /**
   * Get selected product from selected shop.
   * 
   * @param id The id in default source of selected product
   * @return Observable with product
   */
  public getProductByShopIdAndId(shopId:number, id:number):Observable<Product>
  {
    return this.http.get(API_ENDPOINT + "/products/shop/" + shopId + "/product/" + id)
                    .map(this.extractData);
  }

  /**
   * Enforce server-side application to get products from PrestaShop MySQL 
   * and save new products to server-side application data base and then
   * get all products by shop ID from server-side application data base.
   * 
   * @param id The id of selected shop
   * @return Observable with array of products
   */
  public getPrestaProductsByShopId(id:number):Observable<Product[]>
  {
    return this.http.get(API_ENDPOINT + "/products/presta/shop/" + id)
                    .map(this.extractData);
  } 


  private extractData(response:Response):any
  {
    let body = response.json();
    return body || { };
  }

}

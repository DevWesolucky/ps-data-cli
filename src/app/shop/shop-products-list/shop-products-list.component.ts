import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response } from '@angular/http';

import { DATA_COMPLETED, DATA_FAILED, DATA_LOADING } from '../../shared/global-constants';
import { FailureParser } from '../../shared/failure-parser';
import { Logger } from '../../shared/logger';
import { ProductService } from '../product.service';
import { Product } from '../domain/product';

@Component({
  selector: 'app-shop-products-list',
  templateUrl: './shop-products-list.component.html',
  styleUrls: ['./shop-products-list.component.css']
})

export class ShopProductsListComponent implements OnInit 
{

  private productsList:Product[];
  private failureMsg:string;
  private dataState:string;
  private shopId:number;

  constructor(private router:Router, 
              private activatedRoute:ActivatedRoute,
              private productService:ProductService) { }

  public ngOnInit():void 
  {
    this.shopId = this.getRouteIdParm();
    Logger.debug(":: ShopProductsComponent.ngOnInit > shopId: " + this.shopId);
    this.getProductsListByShopId(this.shopId);
  }

  private getProductsListByShopId(id:number):void
  {
    this.dataState = DATA_LOADING;
    this.productService.getProductsListByShopId(id)
                    .subscribe(
                        items => this.productsList = items,
                        error => this.onDataFailed(error),
                        () => this.onDataCompleted()
                      );
  }

  private getMySqlProducts():void
  {
    this.dataState = DATA_LOADING;
    this.productService.getMySqlProductsByShopId(this.shopId)
                    .subscribe(
                        items => this.productsList = items,
                        error => this.onDataFailed(error),
                        () => this.onDataCompleted()
                      );
  }


  private showProductDetails(product:Product):void
  {
    let link = ['shop', this.shopId, 'product', product.id];
    this.router.navigate(link);
  }

  private showShopProductPage(product:Product):void
  {
    window.open(product.url, '_blank');
  }

  private onDataCompleted():void
  {
    Logger.debug("ShopProductsComponent.onGetCompleted > products num: " + this.productsList.length);
    this.dataState = DATA_COMPLETED;
    Logger.debugArrayObjByIndex(this.productsList);
    // Logger.debugArrayObjByIndex(this.productsList, 6);
  }

  private onDataFailed(response:Response):void
  {
    this.dataState = DATA_FAILED;
    this.failureMsg = FailureParser.parseFailureResponse(response);
  }

  private getRouteIdParm():number
  {
    let id:number = -1;
    this.activatedRoute.params.forEach((params: Params) => {
      id = +params['id'];
    });
    return id;
  }


}

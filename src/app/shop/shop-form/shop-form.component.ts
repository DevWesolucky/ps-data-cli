import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Response } from '@angular/http';

import { DATA_COMPLETED, DATA_FAILED, DATA_LOADING } from '../../shared/global-constants';
import { FailureParser } from '../../shared/failure-parser';
import { Logger } from '../../shared/logger';
import { ShopService } from '../shop.service';
import { Shop } from '../domain/shop';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.css']
})

export class ShopFormComponent implements OnInit 
{

  private shop:Shop;
  private failureMsg:string = "";
  private dataState:string;

  constructor(private router:Router, 
              private activatedRoute: ActivatedRoute,
              private shopService:ShopService) { }

  public ngOnInit():void 
  {
    let id:number = this.getRouteIdParm();
    Logger.debug(":: ShopFormComponent.ngOnInit > id: " + id);
    this.shop = new Shop();
    if (id == 0)
    {
      this.dataState = DATA_COMPLETED;
    } else {
      this.dataState = DATA_LOADING;
      this.getShopById(id);
    }
  }

  private getShopById(id:number):void
  {
    Logger.debug("ShopFormComponent.getShopById > id: " + id);
    this.shopService.getShopById(id)
                    .subscribe(
                        shop => this.onDataSuccess(shop),
                        error => this.onDataFailed(error),
                        () => this.onDataCompleted()
                      );
  }

  private onSubmit():void
  {
    this.dataState = DATA_LOADING;
    Logger.debug("ShopFormComponent.onSubmit");
    this.shopService.updateShop(this.shop)
                    .subscribe(
                      shop => this.onSubmitDataSuccess(shop),
                      error => this.onDataFailed(error),
                      () => this.onDataCompleted()
                    );

  }


  private onDataSuccess(shop:Shop):void
  {
    Logger.debug("ShopFormComponent.onDataSuccess");
    this.shop = shop;
  }

  private onSubmitDataSuccess(shop:Shop):void
  {
    Logger.debug("ShopFormComponent.onSubmitDataSuccess");
    this.router.navigateByUrl("shops");
  }

  private onDataCompleted():void
  {
    Logger.debug("ShopFormComponent.onDataCompleted");
    this.dataState = DATA_COMPLETED;
  }

  private onDataFailed(response:Response):void
  {
    Logger.debug("ShopFormComponent.onDataFailed");
    this.dataState = DATA_FAILED;
    this.failureMsg = FailureParser.parseFailureResponse(response);
  }

  private getRouteIdParm():number
  {
    let id:number = -1;
    this.activatedRoute.params.forEach((params: Params) => {
      id = +params['shopId'];
    });
    return id;
  }


}

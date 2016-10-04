import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { DATA_COMPLETED, DATA_FAILED, DATA_LOADING } from '../../shared/global-constants';
import { FailureParser } from '../../shared/failure-parser';
import { Logger } from '../../shared/logger';
import { ShopService } from '../shop.service';
import { Shop } from '../domain/shop';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})

export class ShopsListComponent implements OnInit 
{

  private shopsList:Shop[];
  private failureMsg:string;
  private dataState:string;

  constructor(private router:Router, 
              private shopService:ShopService) { }

  public ngOnInit():void
  {
    Logger.debug(":: ShopsListComponent.ngOnInit");
    this.getShopsList();
  }

  private getShopsList():void
  {
    this.dataState = DATA_LOADING;
    this.shopService.getShopsList()
                    .subscribe(
                        items => this.shopsList = items,
                        error => this.onDataFailed(error),
                        () => this.onDataCompleted()
                      );
  }

  private deleteShop(shop:Shop):void
  {
    Logger.debug("ShopsListComponent.deleteShop > id: " + shop.id);
    this.shopService.deleteShop(shop.id)
                    .subscribe(
                        shop => this.onDeleteShopCompleted(shop),
                        error => this.onDataFailed(error),
                        () => this.onDataCompleted()
                      );
  }

  private onDeleteShopCompleted(shop:Shop):void
  {
    this.getShopsList();
  }

  private onDataCompleted():void
  {
    Logger.debug("ShopsListComponent.onGetCompleted \n" + this.shopsList);
    this.dataState = DATA_COMPLETED;
    Logger.debugArrayObjByIndex(this.shopsList);
  }

  private onDataFailed(response:Response):void
  {
    this.dataState = DATA_FAILED;
    this.failureMsg = FailureParser.parseFailureResponse(response);
  }

  private viewShop(shop:Shop):void
  {
    Logger.debug("ShopsListComponent.viewShop > id: " + shop.id);
    // let link = ['shop', shop.id, 'products'];
    let link = ['shops', shop.id, 'products'];
    this.router.navigate(link);
  }

  private editShop(shop:Shop):void
  {
    Logger.debug("ShopsListComponent.editShop > id: " + shop.id);
    let link = ['shops', shop.id, 'edit'];
    this.router.navigate(link);
  }

  private showNewShopForm():void
  {
    Logger.debug("ShopsListComponent.showNewShopForm");
    // parameter id == 0 as flag to create new shop object
    let link = ['shops', 0, 'edit'];
    this.router.navigate(link);
  }

}

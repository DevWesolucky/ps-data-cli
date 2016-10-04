import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';

import { DATA_COMPLETED, DATA_FAILED, DATA_LOADING } from '../../shared/global-constants';
import { FailureParser } from '../../shared/failure-parser';
import { Logger } from '../../shared/logger';
import { ProductService } from '../product.service';
import { Product } from '../domain/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit 
{

  private product:Product;
  private failureMsg:string = "";
  private dataState:string;
  private currentId:number;
  private shopId:number;
  private currentImgIndex:number = 0;
  private imgSet:Array<Object> = new Array();
  private dataSet:Array<Object> = new Array();
  private carouselRenderCompleted:boolean = false;
  private imgSetInfo:string = "0/0";

  constructor(private activatedRoute:ActivatedRoute,
              private productService:ProductService) { }

  public ngOnInit():void
  {
    Logger.debug(":: ProductDetailsComponent.ngOnInit")
    this.parseRouteParams();
    this.getProductByShopIdAndId(this.shopId, this.currentId);
  }



  private getProductByShopIdAndId(shopId:number, id:number):void
  {
    this.product = new Product();
    this.dataState = DATA_LOADING;
    Logger.debug("ProductDetailsComponent.getDefaultProductById ");
    this.productService.getProductByShopIdAndId(shopId, id)
                    .subscribe(
                        product => this.onDataSuccess(product),
                        error => this.onDataFailed(error),
                        () => this.onDataCompleted()
                      );
  }

  private onDataSuccess(product:Product):void
  {
    Logger.debug("ProductDetailsComponent.onDataSuccess");
    this.product = product;
    this.recursivelyIterateProperties(this.product);
    this.imgSet = product.productImagesArr;
  }

  private recursivelyIterateProperties(obj) 
  {
      for (var prop in obj) 
      {
          // Logger.debug(prop + ": " + obj[prop]);
          let dataObj:Object = {fieldName:prop, fieldValue:obj[prop]};
          if (!(typeof(obj[prop]) === 'string') && !(typeof(obj[prop]) === 'number'))
          {
            this.recursivelyIterateProperties(obj[prop]);
          } else {
            this.dataSet.push(dataObj);
          }

      }
  }

  private onDataCompleted():void
  {
    Logger.debug("ProductDetailsComponent.onDataCompleted");
    this.dataState = DATA_COMPLETED;

    if (this.imgSet.length > 0)
    {
      // ugly workaround of issue:
      // https://github.com/angular/angular/issues/10131
      setTimeout(() => this.navigateCarousel(0), 0);
    }

    if (this.imgSet.length < 2) this.disableImgButtons();

  }

  private disableImgButtons():void
  {
    let prevBtn:HTMLElement = document.getElementById("prevImgBtn");
    prevBtn.classList.add("disabled");
    let nextBtn:HTMLElement = document.getElementById("nextImgBtn");
    nextBtn.classList.add("disabled");
  }

  private onDataFailed(response:Response):void
  {
    Logger.debug("ProductDetailsComponent.onDataFailed");
    this.dataState = DATA_FAILED;
    this.failureMsg = FailureParser.parseFailureResponse(response);
  }

  private parseRouteParams():void
  {
    this.activatedRoute.params.forEach((params: Params) => {
      this.currentId = +params['id'];
      this.shopId = +params['shopId'];
    });
  }


  private navigateCarousel(direction:number):void 
  {
    let box:Element = document.querySelector('.carouselbox');

    let items:NodeListOf<Element> = box.querySelectorAll('.content li');
    let current:Element = items[this.currentImgIndex];

    // hide old
    current.classList.remove('current');

    // calculate new index
    this.currentImgIndex = this.currentImgIndex + direction;
    if (this.currentImgIndex > this.imgSet.length - 1) this.currentImgIndex = 0;
    if (this.currentImgIndex < 0) this.currentImgIndex = this.imgSet.length - 1;

    this.imgSetInfo = (this.currentImgIndex + 1) + "/" + this.imgSet.length;

    // set new current
    current = items[this.currentImgIndex];
    current.classList.add('current');

  }

}

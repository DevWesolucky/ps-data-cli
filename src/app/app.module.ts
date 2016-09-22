import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { ShopsListComponent } from './shop/shops-list/shops-list.component';
import { ShopProductsListComponent } from './shop/shop-products-list/shop-products-list.component';
import { ShopFormComponent } from './shop/shop-form/shop-form.component';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';

import { ShopService } from './shop/shop.service';
import { ProductService } from './shop/product.service';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    ShopsListComponent,
    ShopProductsListComponent,
    ShopFormComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  providers: [ShopService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

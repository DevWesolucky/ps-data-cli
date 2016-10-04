// - Routes instead of RouteConfig
// - RouterModule instead of provideRoutes
import { Routes, RouterModule } from '@angular/router';

import { ShopsListComponent } from './shop/shops-list/shops-list.component';
import { ShopFormComponent } from './shop/shop-form/shop-form.component';
import { ShopProductsListComponent } from './shop/shop-products-list/shop-products-list.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';

const routes:Routes = [
  {
    path: 'shops',
    component: ShopsListComponent
  },
  {
    path: 'shops/:shopId/edit',
    component: ShopFormComponent
  },
  {
    // path: 'products/default/shop/:id',
    path: 'shops/:shopId/products',
    component: ShopProductsListComponent
  },
  {
    // path: 'products/default/:id',
    path: 'shops/:shopId/products/:id',
    component: ProductDetailsComponent
  },
  {
    path: '',
    redirectTo: '/shops',
    pathMatch: 'full'
  }
];

// - Updated Export
export const routing = RouterModule.forRoot(routes);
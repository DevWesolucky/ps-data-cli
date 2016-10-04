# PsDataCli
Web client for presenting data from REST service application (custom PrestaShop data). You can use one of two option as REST endpoint:
- [PsDataNode][] JavaScript (Node.js) server side application.
- [PsDataSb][] Java (Spring Boot) application.

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.

##Prerequisites
- Some running REST endpoint (see [PsDataSb][] repo).
- Some instance of [PrestaShop][] to test (e.g. installed on localhost).


## Usage

### Run application

![start_page.png](https://lab.wesolucky.pl/github/start_page.png)

### Add new shop
![add_new_shop_form.png](https://lab.wesolucky.pl/github/add_new_shop_form.png)

### After success of previous step
![after_save_shop_success.png](https://lab.wesolucky.pl/github/after_save_shop_success.png)

### First look at products list
![first_look_products_list.png](https://lab.wesolucky.pl/github/first_look_products_list.png)

### Get MySQL products
![get_mysql_products_success.png](https://lab.wesolucky.pl/github/get_mysql_products_success.png)

### View product details
![view_product_details.png](https://lab.wesolucky.pl/github/view_product_details.png)

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

[PsDataSb]: https://github.com/DevWesolucky/ps-data-sb
[PsDataNode]: https://github.com/DevWesolucky/ps-data-node
[PrestaShop]: https://www.prestashop.com

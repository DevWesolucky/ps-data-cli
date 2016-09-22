import { ProductImage } from './product-image';

export class Product 
{
    /**
     * The id of product in server-side application data base.
     */
    public id:number;

    /**
     * The productId from PrestaShop MySQL.
     */
    public productId:number;

    /**
     * The attribute product id from PrestaShop MySQL.
     */
    public attributeProductId:number;

    public code:string;

    public name:string;
    public attributeName:string;
    public supplierId:string;
    public linkRewrite:string;
    public url:string;

    public shopId:number;

    /**
     * Array of product images
     */
    public prestaProductImageSet:Array<ProductImage> = new Array();
    
}

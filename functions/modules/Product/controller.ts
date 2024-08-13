import { TODAYS_DATE, GENERATE_STRING } from '../../utils/constants';
import { BaseController } from "../baseController";
import { ProductService } from './service';

export class ProductController extends BaseController {
    private _productService = new ProductService();

    public createProduct = async (parsedBody: any) => {
        try {
            const user = await this._productService.createProduct(parsedBody);
            return user;
        } catch (error) {
            return this.sendResponse(error)
        }
    };

    public getProducts = async () => {
        try {
            const user = await this._productService.getProducts();
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public getProductById = async (userParams:any) => {
        try {
            const user = await this._productService.getProductById(userParams);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public updateProduct = async (productId: any, parsedBody: any) => {
        try {
            const user = await this._productService.updateProduct(productId, parsedBody);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public deleteProduct = async (userParams:any) => {
        try {
            const user = await this._productService.deleteProduct(userParams);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    } 
    
}

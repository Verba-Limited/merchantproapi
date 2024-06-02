import { ProductModel } from './model';

import { ObjectId } from "mongodb";

export class ProductService {

    public createProduct = async (parsedProduct: any) => {
        try {
            const { email, productNumber } = parsedProduct;
            console.log("parsedBody--->", parsedProduct);
            const product = await ProductModel.findOne({ email, productNumber });
            if(product) {
                return { success: false, statusCode: 400,  message: "Product already existed", data: null }; 
            } else {
                parsedProduct.status = true;
                parsedProduct.createdDate = new Date();
                console.log("Product request body--->", parsedProduct);
                const newProduct = new ProductModel(parsedProduct);
                newProduct.save();
                return { success: true, statusCode: 200, message: "Product successfully created!", data: newProduct };
            }
        } catch (e) {
            return { success: false, statusCode: 400, message: "Product creation failed!", data: e };
        }
    }

    public getProducts = async () => {
        const products = await ProductModel.find({});
        if (products) return { success: true, statusCode: 200, message: "All Products successfully retrieved!", data: products };
        return { success: false, statusCode: 400,  message: "Error in fetching All Products", data: null };  
    }

    public getProductById = async (params: any) => {
        const { productId } = params;
        let prodID = new ObjectId(productId);
        console.log("prodID--->", prodID)
        const product = await ProductModel.findById(productId);
        if (product) {
            return { success: true, statusCode: 200, message: "Product successfully retrieved!", data: product };
        }
        return { success: false, statusCode: 400, message: "Error in fetching Product Details", data: null };
    }

    public updateProduct = async (userId:any, parsedBody: any) => {}

    public deleteProduct = async (params:any) => {
        const { email, productId } = params;
        let prodID = new ObjectId(productId);
        const user = await ProductModel.findOneAndDelete({ email, _id: prodID });
        if(user) return { success: true, statusCode: 200, message: "Product successfully deleted!", data: user };
        return { success: false, statusCode: 400, message: "Error in deleting Product", data: null };
    }

}
import { Schema, model } from "mongoose";

import { IProduct } from "./interface";

const productSchema = new Schema<IProduct>({
    organizationId: { type: String, ref: 'Organization' },
    creatorId: { type: String, ref: 'Merchant' },
    email: { type: String, required: false },
    manufacturer: { type: String, required: false },
    productNumber: { type: String, required: false },
    // productName: { type: String, required: true },
    productName: {
        type: String,
        required: [true, 'Product name is required.']
    },
    productCategory: { type: String, required: [true, 'Product Category is required.'] },
    productDescription: { type: String, required: false },
    nafdacNumber: { type: String, required: [true, 'NAFDAC Number is required.'] },
    quantity: { type: Number, required: [true, 'Product Quantity is required.']  },
    price: { type: Number, required: [true, 'Product Price is required.'] },
    coverPicture: { type: String, required: false },
    status: { type: String, required: false },
    manufacturedDate: { type: Date, required: false },
    expiryDate: { type: Date, required: false },
    createdDate: { type: Date, required: false },
    updatedDate: { type: Date, required: false },
});

const ProductModel = model<IProduct>('Product', productSchema);

export { ProductModel, productSchema }

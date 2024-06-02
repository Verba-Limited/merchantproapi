import { ObjectId } from "mongoose";

export interface IProduct {
    organizationId: any;
    creatorId: any;
    email: any;
    manufacturer: string;
    productNumber: string;
    productName: string;
    productCategory: string;
    productDescription: any;
    nafdacNumber: any;
    quantity: any;
    price: any;
    coverPicture: any;
    status: any;
    manufacturedDate: any;
    expiryDate: any;
    createdDate: any;
    updatedDate: any;
}
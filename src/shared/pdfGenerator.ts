const htmlPDF = require('puppeteer-html-pdf'); 
// import path from 'path';
import fs from "fs";
import { GENERATE_REFERENCE } from "../utils/constants";
// import { BillsTransactionModel } from "../modules/Transaction/model";

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'ddkvwvuat',
    api_key: '583323385643242',
    api_secret: 'sXhwnG2lX_vYKnI7M10CSKyKhLk'
});

export const pdfHandler = async (saveBillsTransactionId: any, transactionId: any, billReferenceName: any, htmlFile: any, params:any) => {
    // let buildPath = path.normalize(path.join(__dirname, '../'));
   
    const pdfRefNumber = GENERATE_REFERENCE(10).toLowerCase();

    let fileName = billReferenceName+transactionId+pdfRefNumber
    let pdfPath = `${__dirname}/${fileName}.pdf`;

    const options = {
        format: 'A4',
        path: pdfPath // you can pass path to save the file
        // path: buildPath+`${billReferenceName}.pdf` // you can pass path to save the file
    }

    // const content = htmlFile; 
    
    try {
       // GENERATE PDF
       // const generated = await htmlPDF.create(content, options); 
       await htmlPDF.create(htmlFile, options); 
       // console.log("GENERATED---> ", generated);
       
       // Upload to Cloudinary
        const pdfUploadResponse = await cloudinary.uploader.upload(pdfPath, {
            folder: 'receipts',
        })

        console.log("PDF UPLOAD CLOUDINARY RESPONSE---->", pdfUploadResponse);

        const uploadedPath = pdfUploadResponse.secure_url;

        // save link to bill transaction

        // const getBillTransaction = await BillsTransactionModel.findOne({ _id: saveBillsTransactionId, cardTransactionId: transactionId });
        // if(getBillTransaction) {
        //     getBillTransaction.receiptLink = uploadedPath;
        //     getBillTransaction.save();
        // }

        return { success: true, data: uploadedPath, error: null }
    } catch (error) {
        console.log('htmlPDF error', error);
        return { success: false, data: null, error: error }
    } 
    // finally {
    //     fs.unlinkSync(pdfPath);
    // }
}
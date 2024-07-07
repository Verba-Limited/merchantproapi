import express, { Router, Request, Response,  NextFunction } from "express";

import multer from "multer";
import path from 'path';
import fs from "fs";

import { controllerHandler } from "../../shared/controllerHandler";
import { MerchantController } from './controller';
import { validation, orgIdApiKeyMiddleware } from '../../middleware';
import { OnlySchemas } from "../AuthenticateUser/onlySchema"; 

import { authenticate } from "../AuthenticateUser/authenticate"; 

const router = Router();
const call = controllerHandler;
const Merchant = new MerchantController();

// router.use(validation(OnlySchemas.MerchantSchema, true));

router.post("/", orgIdApiKeyMiddleware(), call(Merchant.createMerchant, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post("/send-verification", call(Merchant.sendMerchantVerification, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.get('/', authenticate.required, call(Merchant.getMerchants, (req: Request, res: Response, next: NextFunction) => [req]));
router.get('/:merchantId', authenticate.required, call(Merchant.getMerchantById, (req: Request, res: Response, next: NextFunction) => [req.params]));
router.patch('/:merchantId', authenticate.required, call(Merchant.updateMerchant, (req: Request, res: Response, next: NextFunction) => [req.params.merchantId, req.body]));
// router.delete('/:phoneNumber', call(Merchant.deleteMerchant, (req: Request, res: Response, next: NextFunction) => [req.params.phoneNumber]));

router.post('/verify', call(Merchant.verifyMerchant, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.get('/:email/status', call(Merchant.getMerchantVerifyStatus, (req: Request, res: Response, next: NextFunction) => [req.params.email]));

router.delete("/clear-db", call(Merchant.clearDB, (req: Request, res: Response, next: NextFunction) => []));

// let buildPath = path.normalize(path.join(__dirname, '../client/build/static/media/uploads'));

const storage = multer.diskStorage({
    // destination: '../client/build/uploads/profile',
    destination: './public',
    filename: function (req, file, cb) {
        // let fileExtension = path.extname(file.originalname).toLowerCase();
        let fileExtension = file.originalname.match(/\.(jpg|jpeg|png|PNG|gif)$/);
        if (fileExtension) {
            cb(null, req.params.userCode+'-'+file.fieldname.toLowerCase() + '-' + Date.now() + path.extname(file.originalname));
        } else {
            cb(new Error("Either jpg, jpeg or png image extension is allowed."), "false")
        }
    },
});
const upload = multer({
    storage: storage,     
    limits: {
      files: 1, // allow up to 5 files per request,
      fileSize: 1 * 1024 * 1024 // 2 MB (max file size)
}});

        
// router.post('/save-profile-picture/:userCode', upload.single('profileImage'),  call(Merchant.uploadProfilePicture,  (req: Request, res: Response, next: NextFunction) =>  [req, req.file, req.params.userCode]));


router.post('/update-profile/:userCode', upload.single('profileImage'),  call(Merchant.uploadProfilePhoto,  (req: Request, res: Response, next: NextFunction) =>  [req.file, req.params.userCode]));


export default router;


// {
//     "organizationId": "6065d22d0d1f872acc35cbf3",
//     "businessInfo": {
//       "tin": "123456789",
//       "businessPhoneNumber": "1234567890",
//       "businessAddress": "123 Main St, City",
//       "country": "Country Name",
//       "state": "State Name",
//       "lga": "Local Government Area Name",
//       "businessType": "Sole proprietor",
//       "ageOfCompany": "0 - 2 years",
//       "companyTieredRevenue": "Below 1M",
//       "referralSource": {
//         "howDidYouHear": "Social media"
//       }
//     },
//     "serviceInfo": {
//       "products": [
//         {
//           "name": "Product Name",
//           "description": "Product Description",
//           "amount": 10.99
//         }
//       ],
//       "paymentPlan": "Instant Payment",
//       "gracePeriod": "7 days"
//     },
//     "verified": false,
//     "eSign": false,
//     "agreementSigned": false,
//     "kycDocuments": ["file1.pdf", "file2.jpg"]
//   }
  

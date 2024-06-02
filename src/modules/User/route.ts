import express, { Router, Request, Response,  NextFunction } from "express";

import multer from "multer";
import path from 'path';
import fs from "fs";

import { controllerHandler } from "../../shared/controllerHandler";
import { UserController } from './controller';
import { validation, orgIdApiKeyMiddleware } from '../../middleware';
import {OnlySchemas} from "../AuthenticateUser/onlySchema"; 

import { authenticate } from "../AuthenticateUser/authenticate"; 

const router = Router();
const call = controllerHandler;
const User = new UserController();

// router.use(validation(OnlySchemas.UserSchema, true));

router.post("/", validation(OnlySchemas.UserSchema, true), orgIdApiKeyMiddleware(), call(User.createUser, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post("/send-verification", validation(OnlySchemas.UserEmailPhoneNumberSchema, true), call(User.sendUserVerification, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.get('/', authenticate.required, call(User.getUsers, (req: Request, res: Response, next: NextFunction) => [req]));
router.get('/:userId', authenticate.required, call(User.getUserById, (req: Request, res: Response, next: NextFunction) => [req.params]));
router.patch('/:userId', authenticate.required, call(User.updateUser, (req: Request, res: Response, next: NextFunction) => [req.params.userId, req.body]));
// router.delete('/:phoneNumber', call(User.deleteUser, (req: Request, res: Response, next: NextFunction) => [req.params.phoneNumber]));

router.post('/verify', validation(OnlySchemas.UserActivationSchema, true), call(User.verifyUser, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.get('/:email/status', call(User.getUserVerifyStatus, (req: Request, res: Response, next: NextFunction) => [req.params.email]));

router.post("/invite", authenticate.required, validation(OnlySchemas.UserInviteSchema, true), call(User.inviteSubUser, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.get("/invitation/:inviteId/:status", validation(OnlySchemas.UserInviteSchema, true), call(User.inviteSubUser, (req: Request, res: Response, next: NextFunction) => [req.params.inviteId, req.params.status]));

router.get("/invitation-response/:userEmail/:userEmailHash/:inviteEmail/:inviteId/:inviteStatus", validation(OnlySchemas.UserInviteSchema, true), call(User.inviteOperation, (req: Request, res: Response, next: NextFunction) => [req.params]));

router.delete("/clear-db", call(User.clearDB, (req: Request, res: Response, next: NextFunction) => []));

// router.get('/subuser/:userId', call(User.getSubUsers, (req: Request, res: Response, next: NextFunction) => [req.params.userId]));

router.post("/preferred-name", validation(OnlySchemas.UserEmailSchema, true), call(User.savePreferredName, (req: Request, res: Response, next: NextFunction) => [req.body]));

router.get("/check-referral/:userCode/:preferredName", call(User.checkReferralLinkOrCode, (req: Request, res: Response, next: NextFunction) => [req.params.userCode, req.params.preferredName]));

router.post("/referral/:userId", call(User.registerReferral, (req: Request, res: Response, next: NextFunction) => [req.params.userId, req.body]));


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

        
// router.post('/save-profile-picture/:userCode', upload.single('profileImage'),  call(User.uploadProfilePicture,  (req: Request, res: Response, next: NextFunction) =>  [req, req.file, req.params.userCode]));


router.post('/update-profile/:userCode', upload.single('profileImage'),  call(User.uploadProfilePhoto,  (req: Request, res: Response, next: NextFunction) =>  [req.file, req.params.userCode]));


export default router;
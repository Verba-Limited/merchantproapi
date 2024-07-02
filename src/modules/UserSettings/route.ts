import express, { Router, Request, Response,  NextFunction } from "express";
import { controllerHandler } from "../../shared/controllerHandler";
import { AccountController } from './controller';
import { validation } from '../../middleware/validation';
import { authenticate } from "../AuthenticateUser/authenticate"; 
import { OnlySchemas } from "../AuthenticateUser/onlySchema"; 

const router = Router();
const call = controllerHandler;
const Account = new AccountController();

router.post("/forgot-password", validation(OnlySchemas.UserEmailSchema, true), call(Account.forgotPassword, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post('/verify-password-code', validation(OnlySchemas.UserActivationSchema, true), call(Account.verifyAccountPasswordCode, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post('/reset-password', validation(OnlySchemas.ResetPasswordSchema, true), call(Account.resetPassword, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post('/change-password/:userId', authenticate.required, call(Account.changePassword, (req: Request, res: Response, next: NextFunction) => [req.params.userId, req.body]));
router.post('/deactivate-account/:userId', authenticate.required, validation(OnlySchemas.UserEmailSchema, true), call(Account.deactivateAccount, (req: Request, res: Response, next: NextFunction) => [req.params.phoneNumber, req.body]));

router.post('/sms/delivery-status', call(Account.smsDeliveryStatus, (req: Request, res: Response, next: NextFunction) => [req.body]));

router.post('/email/test', call(Account.sendTestEmail, (req: Request, res: Response, next: NextFunction) => [req.body]));

router.post('/email/waitlist', call(Account.sendWaitlistEmail, (req: Request, res: Response, next: NextFunction) => [req.body]));


export default router;

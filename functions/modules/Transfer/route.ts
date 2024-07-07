import express, { Router, Request, Response,  NextFunction } from "express";

import { controllerHandler } from "../../shared/controllerHandler";
import { TransferController } from './controller';
import { validation, userMiddleware, userApiKeyMiddleware, apiKeyMiddleware } from '../../middleware';

import { authenticate } from "../AuthenticateUser/authenticate"; 

const router = Router();
const call = controllerHandler;
const Transfer = new TransferController();

router.post('/', authenticate.required, userApiKeyMiddleware(), call(Transfer.createTransfer, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.get('/', authenticate.required, apiKeyMiddleware(), call(Transfer.getTransfers, (req: Request, res: Response, next: NextFunction) => []));
router.get('/:userId', authenticate.required, call(Transfer.getTransferById, (req: Request, res: Response, next: NextFunction) => [req.params]));
router.patch('/:userId', authenticate.required, call(Transfer.updateTransfer, (req: Request, res: Response, next: NextFunction) => [req.params.userId, req.body]));
router.delete('/:phoneNumber', call(Transfer.deleteTransfer, (req: Request, res: Response, next: NextFunction) => [req.params.phoneNumber]));

export default router;
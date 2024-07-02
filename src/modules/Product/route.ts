import express, { Router, Request, Response,  NextFunction } from "express";

import { controllerHandler } from "../../shared/controllerHandler";
import { ProductController } from './controller';
import { validation, userMiddleware, orgIdApiKeyMiddleware, apiKeyMiddleware } from '../../middleware';

import { authenticate } from "../AuthenticateUser/authenticate"; 

const router = Router();
const call = controllerHandler;
const Product = new ProductController();

router.post('/', authenticate.required, orgIdApiKeyMiddleware(), call(Product.createProduct, (req: Request, res: Response, next: NextFunction) => [req.body, next]));
router.get('/', authenticate.required, apiKeyMiddleware(), call(Product.getProducts, (req: Request, res: Response, next: NextFunction) => []));
router.get('/:productId', authenticate.required, call(Product.getProductById, (req: Request, res: Response, next: NextFunction) => [req.params]));
router.patch('/:userId', authenticate.required, call(Product.updateProduct, (req: Request, res: Response, next: NextFunction) => [req.params.userId, req.body]));
router.delete('/:email/:productId', call(Product.deleteProduct, (req: Request, res: Response, next: NextFunction) => [req.params]));

export default router;
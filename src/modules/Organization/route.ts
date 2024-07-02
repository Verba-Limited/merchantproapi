import express, { Router, Request, Response,  NextFunction } from "express";

import { controllerHandler } from "../../shared/controllerHandler";
import { OrganizationController } from './controller';

import { authenticate } from "../AuthenticateUser/authenticate"; 
import { apiKeyMiddleware } from "../../middleware";

const router = Router();
const call = controllerHandler;
const Organization = new OrganizationController();

router.post("/", call(Organization.createOrganization, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.get('/', apiKeyMiddleware(), call(Organization.getOrganizations, (req: Request, res: Response, next: NextFunction) => [req]));
router.get('/:organizationId', apiKeyMiddleware(), call(Organization.getOrganizationById, (req: Request, res: Response, next: NextFunction) => [req.params]));
router.patch('/:organizationId', authenticate.required, call(Organization.updateOrganization, (req: Request, res: Response, next: NextFunction) => [req.params.userId, req.body]));
router.delete('/:phoneNumber', call(Organization.deleteOrganization, (req: Request, res: Response, next: NextFunction) => [req.params.phoneNumber]));

export default router;
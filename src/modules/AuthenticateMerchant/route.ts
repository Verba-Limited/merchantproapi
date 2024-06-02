import express, { Router } from "express";
import { authenticate } from './authenticate';
import { login, currentMerchant, googleLogin, googleRedirect } from './controller';

import "./passportGoogleMerchant";

const router = Router();

// Authentication
// router.post('/login', authenticate.optional, login)
router.post('/login', login)
router.get('/current', authenticate.required, currentMerchant)

router.get("/google", googleLogin);
router.get("/google/redirect", googleRedirect);

export default router;

import { Schema, model } from "mongoose";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { IMerchant, IMerchantActivate, IMerchantInvite } from "./interface";

import ObjectId = Schema.Types.ObjectId

const merchantSchema =  new Schema<IMerchant>({
    organizationId: { type: String, ref: 'Organization', required: true },
    businessInfo: {
      tin: String,
      businessName: String,
      businessEmail: String,
      businessPhoneNumber: { type: String, required: false },
      businessAddress: { type: String, required: false },
      country: { type: String, required: false },
      state: { type: String, required: false },
      lga: { type: String, required: false },
      businessType: { type: String, enum: ['Sole proprietor', 'NGO', 'Private Limited Liability', 'Public Limited Liability'], required: false },
      ageOfCompany: { type: String, enum: ['0 - 2 years', '3 - 5 years', 'Above 5 - 10 years', 'Above 10 - 50 years', 'Above 50 years'], required: false },
      companyTieredRevenue: { type: String, enum: ['Below 1M', '1M - 5M', 'Above 5M - 10M', 'Above 10M - 50M', 'Above 50M'], required: false },
      positionAtCompany: String,
      companySize: { type: String, enum: ['Below 50 Employees', '50 - 100 Employees', 'Above 100 - 500 Employees', 'Above 500 Employees'] },
      logo: String,
      url: String,
      referralSource: {
        howDidYouHear: { type: String, enum: ['Social media', 'LinkedIn', 'Internet Advertisement', 'Google/Search Engine', 'Friend', 'Referral', 'Others'], required: false },
        referralCode: String,
        otherChannel: String
      }
    },
    serviceInfo: {
      products: [{
        name: { type: String, required: false },
        brandName: String,
        nafdacNumber: String,
        expiryDate: Date,
        description: String,
        amount: Number
      }],
      paymentPlan: { type: String, enum: ['Instant Payment', 'Deferred Payment'], required: false },
      gracePeriod: { type: String, enum: ['7 days', '14 days', '30 days', '60 days', '90 days', 'Others'], required: false }
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    rcNumber: { type: String, required: false },
    verified: { type: Boolean, default: false },
    eSign: { type: Boolean, default: false },
    agreementSigned: { type: Boolean, default: false },
    kycDocuments: [String],
    principalOwnerBVN: String,
    hash: { type: String, required: false },
    salt: { type: String, required: false },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});


merchantSchema.methods.setPassword = function (password: any) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex')
}

merchantSchema.methods.validatePassword = function (password: any) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex')
    return this.hash === hash;
}

merchantSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)
    return jwt.sign({
        phoneNumber: this.phoneNumber,
        id: this._id,
        exp: Math.round(expirationDate.getTime() / 1000),
    }, 'secret');
}

merchantSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        phoneNumber: this.phoneNumber,
        token: this.generateJWT(),
    };
}

merchantSchema.pre('deleteOne', function (next) {
    next();
});

const merchantActivateSchema = new Schema<IMerchantActivate>({
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    birthDate: { type: String, required: false },
    bvn: { type: String, required: false },
    otpCode: { type: String, required: true },
    otpType: {
        type: String,
        enum: ["verification", "forgotpassword"],
        default: 'Merchant'
    },
    createdDate: { type: String, required: false },
    entryDate: { type: Date, required: false },
});

const merchantInviteSchema = new Schema<IMerchantInvite>({
    inviteEmail: { type: String, required: true },
    merchantEmail: { type: String, required: true },
    merchant: { type: ObjectId },
    status: { type: String, required: true },
    inviteHash: { type: String, required: false },
    inviteSalt: { type: String, required: false },
    merchantEmailSalt: { type: String, required: false },
    merchantEmailHash: { type: String, required: false },
    createdDate: { type: String, required: false },
    updatedDate: { type: String, required: false },
});

merchantInviteSchema.methods.setInviteCode = function (inviteCode: any) {
    this.inviteSalt = crypto.randomBytes(16).toString('hex')
    this.inviteHash = crypto.pbkdf2Sync(inviteCode, this.inviteSalt, 10000, 64, 'sha512').toString('hex')
}

merchantInviteSchema.methods.validateInviteCode = function (inviteCode: any) {
    const inviteHash = crypto.pbkdf2Sync(inviteCode, this.inviteSalt, 10000, 64, 'sha512').toString('hex')
    return this.inviteHash === inviteHash;
}

merchantInviteSchema.methods.setMerchantEmailHash = function (merchantEmail: any) {
    this.merchantEmailSalt = crypto.randomBytes(16).toString('hex')
    this.merchantEmailHash = crypto.pbkdf2Sync(merchantEmail, this.merchantEmailSalt, 10000, 64, 'sha512').toString('hex')
}

merchantInviteSchema.methods.validateMerchantEmailHash = function (merchantEmail: any) {
    const merchantEmailHash = crypto.pbkdf2Sync(merchantEmail, this.merchantEmailSalt, 10000, 64, 'sha512').toString('hex')
    return this.merchantEmailHash === merchantEmailHash;
}

const MerchantModel = model<IMerchant>('Merchant', merchantSchema);
const MerchantActivateModel = model<IMerchantActivate>('MerchantActivate', merchantActivateSchema);
const MerchantInviteModel = model<IMerchantInvite>('MerchantInvite', merchantInviteSchema);

export { MerchantModel, MerchantActivateModel, MerchantInviteModel, merchantSchema }

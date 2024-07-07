import { Schema, model } from "mongoose";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { IUser, IUserActivate, IUserInvite } from "./interface";

import ObjectId = Schema.Types.ObjectId

const userSchema = new Schema<IUser>({
    organizationId: { type: String, ref: 'Organization', required: true },
    userCode: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    userName: { type: String, required: false },
    gender: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    birthPlace: { type: String, required: false },
    birthDate: { type: String, required: false },
    contactAddress: { type: String, required: false },
    contactAddress2: { type: String, required: false },
    country: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    zipCode: { type: String, required: false },
    bvn: { type: String, required: false },
    nin: { type: String, required: false },
    currency: { type: String, required: false },
    picture: { type: String, required: false },
    userType: { type: String, required: true },
    registerType: { type: String, required: true },
    isActive: { type: Boolean, required: false },
    isVerified: { type: Boolean, required: false },
    hash: { type: String, required: false }, // select: false, hide from displaying in output
    salt: { type: String, required: false },
    accountType: { type: String, required: true },
    preferredName: { type: String, required: false },
    referralLink: { type: String, required: false },
    referralCount: { type: Number, required: false, default: 0 },
    referredUser: [{ type: ObjectId, ref: 'User' }],
    referredBy: { type: ObjectId, ref: 'User' },
    appleId: { type: String, required: false },
    googleId: { type: String, required: false },
    fullName: { type: String, required: false },
    createdDate: { type: Date, required: false },
    updatedDate: { type: Date, required: false },
});

userSchema.methods.setPassword = function (password: any) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex')
}

userSchema.methods.validatePassword = function (password: any) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex')
    return this.hash === hash;
}

userSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)
    return jwt.sign({
        phoneNumber: this.phoneNumber,
        id: this._id,
        exp: Math.round(expirationDate.getTime() / 1000),
    }, 'secret');
}

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        phoneNumber: this.phoneNumber,
        token: this.generateJWT(),
    };
}

userSchema.pre('deleteOne', function (next) {
    next();
});

const userActivateSchema = new Schema<IUserActivate>({
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    birthDate: { type: String, required: false },
    bvn: { type: String, required: false },
    otpCode: { type: String, required: true },
    otpType: {
        type: String,
        enum: ["verification", "forgotpassword"],
        default: 'User'
    },
    createdDate: { type: String, required: false },
    entryDate: { type: Date, required: false },
});

const userInviteSchema = new Schema<IUserInvite>({
    // inviteEmail: { type: String, required: true, unique: true },
    inviteEmail: { type: String, required: true },
    userEmail: { type: String, required: true },
    // user: { type: ObjectId, ref: "User", index: true },
    user: { type: ObjectId },
    status: { type: String, required: true },
    inviteHash: { type: String, required: false },
    inviteSalt: { type: String, required: false },
    userEmailSalt: { type: String, required: false },
    userEmailHash: { type: String, required: false },
    createdDate: { type: String, required: false },
    updatedDate: { type: String, required: false },
});

userInviteSchema.methods.setInviteCode = function (inviteCode: any) {
    this.inviteSalt = crypto.randomBytes(16).toString('hex')
    this.inviteHash = crypto.pbkdf2Sync(inviteCode, this.inviteSalt, 10000, 64, 'sha512').toString('hex')
}

userInviteSchema.methods.validateInviteCode = function (inviteCode: any) {
    const inviteHash = crypto.pbkdf2Sync(inviteCode, this.inviteSalt, 10000, 64, 'sha512').toString('hex')
    return this.inviteHash === inviteHash;
}

userInviteSchema.methods.setUserEmailHash = function (userEmail: any) {
    this.userEmailSalt = crypto.randomBytes(16).toString('hex')
    this.userEmailHash = crypto.pbkdf2Sync(userEmail, this.userEmailSalt, 10000, 64, 'sha512').toString('hex')
}

userInviteSchema.methods.validateUserEmailHash = function (userEmail: any) {
    const userEmailHash = crypto.pbkdf2Sync(userEmail, this.userEmailSalt, 10000, 64, 'sha512').toString('hex')
    return this.userEmailHash === userEmailHash;
}

const UserModel = model<IUser>('User', userSchema);
const UserActivateModel = model<IUserActivate>('UserActivate', userActivateSchema);
const UserInviteModel = model<IUserInvite>('UserInvite', userInviteSchema);

export { UserModel, UserActivateModel, UserInviteModel, userSchema }

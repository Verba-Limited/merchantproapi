import { ObjectId } from "mongoose";

export interface IUser {
    organizationId: any;
    userCode: string;
    firstName: string;
    middleName: string;
    lastName: string;
    userName: string;
    gender: "male" | "female";
    email: string;
    phoneNumber: string;
    birthPlace: string;
    birthDate: string;
    contactAddress: any;
    contactAddress2: any;
    currency: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    bvn: string;
    nin: string;
    userType: "agent" | "user" | "admin" | "merchant" | "api";
    registerType: "custom" | "google" | "apple"; 
    loginType: "custom" | "google" | "apple"; 
    isVerified: boolean;
    isActive: boolean;
    appleId: any;
    googleId: any;
    fullName: any;
    picture: any;
    extraInfo: any;
    accountType: "primary" | "subuser";
    preferredName: string;
    referralLink: string;
    referralCount: number;
    referredUser: any;
    referredBy: any;
    createdDate: any;
    updatedDate: any;
    hash: String;
    salt: String;
    setPassword(password: string): string;
    validatePassword(password: string): boolean;
}

export interface IUserActivate {
    email: string;
    phoneNumber: string;
    birthDate: string;
    bvn: string;
    otpCode: string;
    otpType: string;    
    createdDate: string;
    entryDate: any;
}

export interface IUserInvite  {
    inviteEmail: any;  
    userEmail: any;  
    user: any;
    status: "pending" | "accepted" | "declined" | "removed";
    createdDate: string;
    updatedDate: string;
    inviteHash: String;
    inviteSalt: String;
    userEmailSalt: String;
    userEmailHash: String;
    setInviteCode(inviteCode: string): string;
    validateInviteCode(inviteCode: string): boolean;
    setUserEmailHash(userEmail: string): string;
    validateUserEmailHash(userEmail: string): boolean;
}

// tier-1

// tier-2

// tier-3

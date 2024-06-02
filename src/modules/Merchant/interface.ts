import { ObjectId } from "mongoose";

export interface IMerchant {
    organizationId: string;
    businessInfo: {
      tin?: string;
      businessName?: string;
      businessEmail?: string;
      businessPhoneNumber: string;
      businessAddress: string;
      country: string;
      state: string;
      lga: string;
      businessType: 'Sole proprietor' | 'NGO' | 'Private Limited Liability' | 'Public Limited Liability';
      ageOfCompany: '0 - 2 years' | '3 - 5 years' | 'Above 5 - 10 years' | 'Above 10 - 50 years' | 'Above 50 years';
      companyTieredRevenue: 'Below 1M' | '1M - 5M' | 'Above 5M - 10M' | 'Above 10M - 50M' | 'Above 50M';
      positionAtCompany?: string;
      companySize?: 'Below 50 Employees' | '50 - 100 Employees' | 'Above 100 - 500 Employees' | 'Above 500 Employees';
      logo?: string;
      url?: string;
      referralSource: {
        howDidYouHear: 'Social media' | 'LinkedIn' | 'Internet Advertisement' | 'Google/Search Engine' | 'Friend' | 'Referral' | 'Others';
        referralCode?: string;
        otherChannel?: string;
      };
    };
    serviceInfo: {
      products: {
        name: string;
        brandName?: string;
        nafdacNumber?: string;
        expiryDate?: Date;
        description: string;
        amount: number;
      }[];
      paymentPlan: 'Instant Payment' | 'Deferred Payment';
      gracePeriod: '7 days' | '14 days' | '30 days' | '60 days' | '90 days' | 'Others';
    };
    firstName: string;
    lastName: string;
    email: string;
    rcNumber: string;
    verified: boolean;
    eSign: boolean;
    agreementSigned: boolean;
    kycDocuments: string[];
    principalOwnerBVN?: string;
    hash: String;
    salt: String;
    setPassword(password: string): string;
    validatePassword(password: string): boolean;
    createdDate?: Date;
    updatedDate?: Date;
}
  

export interface IMerchantActivate {
    email: string;
    phoneNumber: string;
    birthDate: string;
    bvn: string;
    otpCode: string;
    otpType: string;    
    createdDate: string;
    entryDate: any;
}

export interface IMerchantInvite  {
    inviteEmail: any;  
    merchantEmail: any;  
    merchant: any;
    status: "pending" | "accepted" | "declined" | "removed";
    createdDate: string;
    updatedDate: string;
    inviteHash: String;
    inviteSalt: String;
    merchantEmailSalt: String;
    merchantEmailHash: String;
    setInviteCode(inviteCode: string): string;
    validateInviteCode(inviteCode: string): boolean;
    setMerchantEmailHash(merchantEmail: string): string;
    validateMerchantEmailHash(merchantEmail: string): boolean;
}

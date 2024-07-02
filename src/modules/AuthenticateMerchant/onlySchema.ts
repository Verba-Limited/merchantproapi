import Joi from 'joi';

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const MerchantSchema = Joi.object({
    organizationId: Joi.string().min(24).max(24).required(),
    firstName: Joi.string().min(3).max(100).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(100).required().email(),
    phoneNumber: Joi.string().min(11).max(11),
    // password: Joi.string().regex(strongPasswordRegex),
    // password: Joi.string(),
    accountType: Joi.string().min(7).max(7).required(),
    registerType: Joi.string().min(3).max(7).required()
})

const MerchantInviteSchema = Joi.object({
    merchantEmail: Joi.string().min(5).max(100).required().email(),
    // inviteEmail: Joi.string().min(5).max(100).required().email()
    inviteEmail: Joi.array().items(Joi.string().min(5).max(100).required().email())
})

const MerchantActivationSchema = Joi.object({
    email: Joi.string().min(5).max(100).email(),
    phoneNumber: Joi.string().min(11).max(11),
    otpCode: Joi.string().min(6).max(6).required(),
    otpType: Joi.string().min(6).max(20).required()
})

const MerchantEmailPhoneNumberSchema = Joi.object({
    email: Joi.string().min(5).max(100).required().email(),
    phoneNumber: Joi.string().min(11).max(11).required()
})

const MerchantEmailSchema = Joi.object({
    email: Joi.string().min(5).max(100).required().email(),
})

const MerchantPhoneSchema = Joi.object({
    phoneNumber: Joi.string().min(11).max(11).required()
})

const ResetPasswordSchema = Joi.object({
    // phoneNumber: Joi.string().min(11).max(11).required(),
    email: Joi.string().min(5).max(100).required().email(),
    newPassword: Joi.string().regex(strongPasswordRegex).required()
})

export const OnlySchemas = {
    MerchantSchema, MerchantActivationSchema, MerchantEmailPhoneNumberSchema, 
    MerchantEmailSchema, MerchantPhoneSchema, ResetPasswordSchema, MerchantInviteSchema
}

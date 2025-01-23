import mongoose, { Schema } from "mongoose"
import Jwt from "jsonwebtoken";
const jwt = Jwt;


const userSchema = new Schema({
    personalDetails: {
        phone: { type: String, required: true, unique: true, trim: true },
        panNo: { type: String, trim: true, index: true },
        name: { type: String, trim: true, index: true },
        email: { type: String, lowercase: true, trim: true },
        panVerified: { type: Boolean },
        pinCode: { type: String, trim: true },
        DOB: { type: String, trim: true },
    },
    businessDetails: {
        gstRegistred: { type: Boolean },
        gstNo: { type: String, trim: true },
        businessType: { type: String, trim: true },
        businessAge: { type: String, trim: true },
        businessPinCode: { type: String, trim: true },
        yearlySales: { type: String, trim: true },
        turnOver: { type: String, trim: true },

        businessName: { type: String, trim: true },
        businessAdd: { type: String, trim: true },
        constitutionOfBusiness: { type: String, trim: true },
        natureOfBusiness: { type: String, trim: true },
        dateOfReg: { type: String, trim: true },
        gstStatus: { type: String, trim: true },
        centerJurisdiction: { type: String, trim: true },
        businessVerified: { type: Boolean },
    },
    vendorFinancing: [{
        bankStatement: { type: String, trim: true },
        copyOfAgreement: { type: String, trim: true },
        auditedFinancial: { type: String, trim: true },
        purchaseOrder: { type: String, trim: true },
        uploadAt: { type: String, trim: true },
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected'] },
    }],

    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
},
    { timestamps: true })


userSchema.methods.genrateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        phone: this.phone,
    },
        process.env.ACCESSTOKEN_KEY,
        {
            expiresIn: process.env.ACCESSTOKEN_EXPIRY
        }
    )
}


userSchema.methods.genrateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESHTOKEN_KEY,
        {
            expiresIn: process.env.REFRESHTOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('user', userSchema)
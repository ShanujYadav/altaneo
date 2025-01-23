import { Lead } from "../models/lead.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { gstVerification } from "../utils/externalApi.js"


const personalDetails = asyncHandler(async (req, res) => {
    const { pid, appName, ts, reqAction, clientIp, userId } = req.body.meta
    const { name, panNo, DOB, email, pinCode, phone } = req.body.pay

    console.log("req----",req.body);
    
    try {
        if (!(pid === 'ALTA' && appName === "Altaneo" && reqAction === 'personalDetails' && userId)) {
            return res.status(400).json(
                new ApiResponse(400, "Payload meta Malformed !"))
        }
        if ([name, panNo, DOB, email, pinCode, phone].some((field) => field?.trim() === '')) {
            return res.status(400).json(new ApiResponse(400, "Payload body Malformed !"))
        }


        // -----------------Verify User details from PAN CARD ----------------------- 
        const dummyName = 'Shanuj Yadav'
        const dummyDOB = '15-01-2004'

        if (!(dummyDOB === DOB && dummyName === name)) {
            return res.status(401).json(new ApiResponse(401, "Provided Details are Not align with PAN CARD !"))
        }


        //-----------------If verified with PAN then save into User table -------------------
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                'personalDetails.name': name,
                'personalDetails.panNo': panNo,
                'personalDetails.DOB': DOB,
                'personalDetails.email': email,
                'personalDetails.pinCode': pinCode,
                'personalDetails.panVerified': true,
            },
            { new: true, runValidators: true }
        ).select('-refreshToken -createdAt -updatedAt -__v');

        if (!updatedUser) {
            return res.status(404).json(new ApiResponse(404, 'User not found'))
        }

        return res.status(200).json(new ApiResponse('000', "User Verified With PAN !", updatedUser))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message))
    }
})




const businessDetails = asyncHandler(async (req, res) => {
    const { pid, appName, ts, reqAction, clientIp, userId } = req.body.meta
    const { gstRegistered, gstNo, businessType, businessAge, businessPinCode, yearlySales, turnOver } = req.body.pay

    try {
        if (!(pid === 'ALTA' && appName === "Altaneo" && reqAction === 'businessDetails' && userId)) {
            return res.status(400).json(new ApiResponse(400, "Payload Meta  Malformed !"))
        }

        if (!(gstRegistered && gstNo && businessType && businessAge && businessPinCode && yearlySales && turnOver)) {
            return res.status(400).json(new ApiResponse(400, "Payload Body Malformed !"))
        }

        let businessName = 'N/A'
        let businessAdd = 'N/A'
        let dateOfReg = 'N/A'
        let gstStatus = 'N/A'
        let natureOfBusiness = 'N/A'
        let centerJurisdiction = 'N/A'
        let constitutionOfBusiness = 'N/A'
        let businessVerified = false


        //-----------------------Verify GST NO---------------------------
        if (gstRegistered === 'true') {
            const result = await gstVerification(gstNo)
            if (result?.legalNameOfBusiness) {
                businessVerified = true
                gstStatus = result.gstnStatus
                dateOfReg = result.dateOfRegistration
                businessName = result.legalNameOfBusiness
                centerJurisdiction = result.centerJurisdiction
                constitutionOfBusiness = result.constitutionOfBusiness
                natureOfBusiness = result.principalPlaceOfBusinessFields?.natureOfPrincipalPlaceOfBusiness

                let fullAdd = result.principalPlaceOfBusinessFields?.principalPlaceOfBusinessAddress
                businessAdd = fullAdd?.floorNumber + ' ' + fullAdd?.buildingNumber + ' ' + fullAdd?.buildingName + ' ' + fullAdd?.streetName + ' ' + fullAdd?.locality + ' ' + fullAdd?.location + ' ' + fullAdd?.stateName
            }
            else {
                return res.status(400).json(new ApiResponse(400, "Invalied GST No !"))
            }
        }


        // --------------------Store details in User table----------------------
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                'businessDetails.gstRegistred': gstRegistered,
                'businessDetails.gstNo': gstNo,
                'businessDetails.businessType': businessType,
                'businessDetails.businessAge': businessAge,
                'businessDetails.businessPinCode': businessPinCode,
                'businessDetails.yearlySales': yearlySales,
                'businessDetails.turnOver': turnOver,
                'businessDetails.businessName': businessName,
                'businessDetails.businessVerified': businessVerified,

                'businessDetails.businessAdd': businessAdd,
                'businessDetails.constitutionOfBusiness': constitutionOfBusiness,
                'businessDetails.natureOfBusiness': natureOfBusiness,
                'businessDetails.dateOfReg': dateOfReg,
                'businessDetails.gstStatus': gstStatus,
                'businessDetails.centerJurisdiction': centerJurisdiction,
            },
            { new: true, runValidators: true }
        ).select('-refreshToken -createdAt -updatedAt -__v')

        if (!updatedUser) {
            return res.status(404).json(new ApiResponse(404, 'User not found !'))
        }

        return res.status(200).json(new ApiResponse('000', "Business Details Submited !", updatedUser))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message))
    }
})











const addDocument = asyncHandler(async (req, res) => {
    const { pid, appName, ts, reqAction, userId } = req.body.meta;
    const { bankStatement, copyOfAgreement, auditedFinancial, purchaseOrder } = req.body.pay;
    try {
        if (!(pid === 'ALTA' && appName === "Altaneo" && reqAction === 'addDocument' && userId && ts)) {
            return res.status(400).json(new ApiResponse(400, "Payload Meta Malformed!"));
        }

        if ([bankStatement, copyOfAgreement, auditedFinancial, purchaseOrder].some((field) => !field?.trim())) {
            return res.status(400).json(new ApiResponse(400, "Payload Body Malformed!"));
        }

        const newDocument = {
            bankStatement,
            copyOfAgreement,
            auditedFinancial,
            purchaseOrder,
            uploadAt: ts,
            status: 'Pending',
        };

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json(new ApiResponse(400, "User does not exist!"))
        }

        const vendorFinancing = user.vendorFinancing || []

        // const oneDayInMs = 24 * 60 * 60 * 1000;
        const oneDayInMs = 60 * 1000;

        const lastUploadedDoc = vendorFinancing.slice(-1)[0];

        if (lastUploadedDoc) {
            const lastUploadDate = new Date(lastUploadedDoc.uploadAt);
            const tsDate = new Date(ts)

            if (tsDate - lastUploadDate < oneDayInMs) {
                return res.status(400).json(new ApiResponse(400, "Document upload is allowed only once in 24 hours."));
            }
        }

        vendorFinancing.push(newDocument);
        user.vendorFinancing = vendorFinancing;

        await user.save()

        if (user.personalDetails?.phone) {
            const result = await Lead.deleteMany({
                phone: user.personalDetails.phone,
                reqAction: 'sendOtp',
            })
        }

         
        return res.status(200).json(new ApiResponse('000', "Document uploaded successfully !", user.vendorFinancing))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message))
    }
})



const vendorFinancingList = asyncHandler(async (req, res) => {
    const { pid, appName, ts, reqAction } = req.body.meta;
    const { recCnt, userId } = req.body.pay

    try {
        if (!(pid === 'ALTA' && appName === "Altaneo" && reqAction === 'vendorFinancingList' && userId && ts)) {
            return res.status(400).json(new ApiResponse(400, "Payload Meta Malformed!"));
        }

        if (!recCnt) {
            return res.status(400).json(new ApiResponse(400, "Payload Body Malformed!"))
        }

        let user = await User.findById(userId).select('-personalDetails -businessDetails -createdAt -updatedAt -__v -refreshToken')

        if (!user) {
            return res.status(400).json(new ApiResponse(400, "User does not exist!"))
        }

        return res.status(200).json(new ApiResponse('000', "List Fetched!", user))

    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message))
    }
})



export { personalDetails, businessDetails, addDocument, vendorFinancingList }
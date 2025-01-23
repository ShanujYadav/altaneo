import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { sendEmail } from "../utils/mail/nodeMailer.js"


const allVendor = asyncHandler(async (req, res) => {
    const { appName, pid, ts, location, reqAction } = req.body.meta
    const { phone, password } = req.body.pay

    try {
        if (pid !== "ALTA" || appName !== 'Altaneo' || reqAction !== 'allVendor' || !ts) {
            return res.status(400).json(
                new ApiResponse(400, "Payload Meta Malformed !"))
        }
        if (!phone || !password) {
            return res.status(400).json(new ApiResponse(400, 'Payload Body Malformed !'))
        }
        if (!(phone == '9528492010' && password == '9528492010')) {
            return res.status(400).json(new ApiResponse(400, 'Invalied Admin !'))
        }
        const users = await User.find({ vendorFinancing: { $exists: true, $ne: [] } })
            .select('-refreshToken -createdAt -updatedAt -__v')

        if (!users.length) {
            return res.status(404).json(new ApiResponse(404, 'No users found'))
        }

        //-------------------------All users data with latest application------------------

        const transformedUsers = users.map(user => {
            const userObject = user.toObject()
            const latestVendorFinancing = userObject.vendorFinancing.reduce((latest, current) =>
                new Date(latest.uploadAt) > new Date(current.uploadAt) ? latest : current
            )
            return {
                ...userObject,
                vendorFinancing: [latestVendorFinancing]
            };
        })

        return res.status(200).json(new ApiResponse('000', 'Users Retrieved successfully', { users: transformedUsers }))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message))
    }
})





const vendorDetails = asyncHandler(async (req, res) => {
    const { appName, pid, ts, location, reqAction } = req.body.meta
    const { phone, password, userId, recCnt, category } = req.body.pay

    try {
        if (pid !== "ALTA" || appName !== 'Altaneo' || reqAction !== 'vendorDetails' || !ts) {
            return res.status(400).json(new ApiResponse(400, "Payload Meta Malformed !"))
        }
        if (!phone || !password || !userId || !recCnt || !category) {
            return res.status(400).json(new ApiResponse(400, 'Payload Body Malformed !'))
        }
        if (!(phone == '9528492010' && password == '9528492010')) {
            return res.status(400).json(new ApiResponse(400, 'Invalied Admin !'))
        }
        const user = await User.findById(userId).select("-updatedAt -__v -refreshToken")
        if (!user) {
            return res.status(404).json(new ApiResponse(404, 'No users found with this userId !'));
        }

        return res.status(200).json(new ApiResponse('000', 'Users Retrieved successfully', user))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message))
    }
})




const takenAction = asyncHandler(async (req, res) => {
    const { appName, pid, ts, reqAction } = req.body.meta
    const { userId, email, phone, docId, status, uploadAt, adminId, adminPassword, businessName, name } = req.body.pay

    try {
        if (pid !== "ALTA" || appName !== 'Altaneo' || reqAction !== 'takenAction' || !ts) {
            return res.status(400).json(new ApiResponse(400, "Payload Meta Malformed !"))
        }

        if (!(adminId == '9528492010' && adminPassword == '9528492010')) {
            return res.status(401).json(new ApiResponse(401, 'Invalied Admin !'))
        }

        if (!name || !businessName || !uploadAt || !docId || !userId || !phone || !email || !status == "Approved" || !status == 'Rejected') {
            return res.status(400).json(new ApiResponse(400, 'Payload Body Malformed !'))
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json(new ApiResponse(404, 'User not found'))
        }

        const financingItem = user.vendorFinancing.find(item => item._id == docId)

        if (!financingItem) {
            return res.status(404).json(new ApiResponse(404, 'No vendor financing Application found for the given docId'));
        }

        financingItem.status = status
        await user.save();

        // Send mail to user 
        const mailResp = await sendEmail(name, businessName, email, uploadAt, status, docId)
       
        if (!mailResp) {
            return res.status(200).json(new ApiResponse('000', `Application ${status} But due to some Issue mail has not been sent !`))
        }
        
        return res.status(200).json(new ApiResponse('000', `Application ${status} `))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message))
    }
})


export { allVendor, vendorDetails, takenAction }
import { Router } from "express";
import { addDocument, businessDetails, personalDetails, vendorFinancingList } from "../controllers/user.controller.js";


const router = Router()

router.route('/personalDetails').post(personalDetails)
router.route('/businessDetails').post(businessDetails)
router.route('/vendorFinancing/addDocument').post(addDocument)

router.route('/vendorFinancing/vendorFinancingList').post(vendorFinancingList)


// Secure Routes
// router.route('/logout').post(verifyUser, logoutEmp)

export default router
import { Router } from "express"
import { allVendor, takenAction, vendorDetails } from "../controllers/admin.controller.js";

const router = Router()

router.route('/allVendor').post(allVendor)
router.route('/vendorDetails').post(vendorDetails)
router.route('/takenAction').post(takenAction)


export default router
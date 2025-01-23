import { Router } from "express"
import { allLeads, contactUs, getInTouch } from "../controllers/leads.controller.js";

const router = Router()

router.route('/allLeads').post(allLeads)
router.route('/contactUs').post(contactUs)
router.route('/getInTouch').post(getInTouch)


export default router
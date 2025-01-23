import axios from "axios";

const sendPhoneOtp = async (phone, otp) => {
    try {
        const body = JSON.stringify({
            apikey: process.env.MTALKZ_APIKEY,
            senderid: process.env.MTALKZ_SENDERID,
            number: phone,
            message: `Your OTP- One Time Password is ${otp} to authenticate your login with ${otp} Powered By mTalkz`,
            format: "json"
        })
        const headers = { 'Content-Type': 'application/json' }
        const otpResponse = await axios.post(process.env.MTALKZ_BASEURL, body, { headers })
        return otpResponse;
    } catch (err) {
        return err?.message
    }
}



const gstVerification = async (gstNo) => {
    try {
        const apiUrl = process.env.APISETU_BASEURL + gstNo
        const headers = {
            'X-APISETU-CLIENTID': process.env.APISETU_CLIENTID,
            'X-APISETU-APIKEY': process.env.APISETU_APIKEY,
        }

        // const res = await axios.get(apiUrl, { headers })
        // console.log('gst res---',res.data)
        // return res.data

        const dummyData = {
            "stateJurisdictionCode": "HR209",
            "taxpayerType": "Regular",
            "stateJurisdiction": "Gurgaon (South) Ward 8",
            "legalNameOfBusiness": "ALTANEO FINANCE PRIVATE LIMITED",
            "dateOfCancellation": "",
            "gstIdentificationNumber": "06ABACA6882A1ZY",
            "natureOfBusinessActivity": [
                "Supplier of Services"
            ],
            "lastUpdatedDate": "01/08/2024",
            "constitutionOfBusiness": "Private Limited Company",
            "dateOfRegistration": "24/06/2024",
            "principalPlaceOfBusinessFields": {
                "principalPlaceOfBusinessAddress": {
                    "buildingName": "Spaze I-Tech Park",
                    "location": "Gurugram",
                    "streetName": "Sohna Road",
                    "buildingNumber": "Unit No.934 Tower B-3",
                    "districtName": "Gurugram",
                    "lattitude": "28.4238350000001",
                    "locality": "Sector 49",
                    "pincode": "122018",
                    "landMark": "",
                    "stateName": "Haryana",
                    "geocodelvl": "Neighbourhood",
                    "floorNumber": "9th Floor",
                    "longitude": "77.038459"
                },
                "natureOfPrincipalPlaceOfBusiness": "Supplier of Services"
            },
            "centerJurisdictionCode": "ZO0306",
            "tradeName": "ALTANEO FINANCE PRIVATE LIMITED",
            "gstnStatus": "Active",
            "centerJurisdiction": "R-20",
            "eInvoiceStatus": "No"
        }
        return dummyData

    } catch (err) {
        return err?.message
    }
}






const panVerification = async (panNo) => {
    try {
        const body = JSON.stringify({
            panNumber: panNo
        })
        const headers = {
            'Authorization': process.env.SIGNZY_AUTHTOKEN,
            'Content-Type': 'application/json'
        }
        const resp = await axios.post(process.env.SIGNZY_BASEURL, body, { headers })
        
        return resp
    } catch (err) {
        return err?.message
    }

}
export { panVerification, gstVerification, sendPhoneOtp }
import { createHash, createHmac } from "crypto-browserify"
import { ymd } from "./metaData.js"
import jwt from 'jsonwebtoken';



console.log('secretKey---',process.env.SECRETKEY);
console.log('hamcKey---',process.env.HMACKEY);
console.log('encr pid---',process.env.PID);



export const genrateMobHash = (payload) => {
    const expiresIn = "5m"
    return jwt.sign({ data: payload }, secretKey, { expiresIn });
}

export const verifyMobHash = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey)
        return decoded
    } catch (error) {
        return null;
    }
}


export const SHA256 = (input) => {
    const hash = createHash('sha256').update(input, 'utf-8').digest('hex');
    return hash.toUpperCase()
}



const getHmac = (pid, ymd) => {
    console.log('pid---',pid);
    console.log('ymd---',ymd);
    const value = pid.toString().concat(ymd)
    var hmac = createHmac("sha256", process.env.HMACKEY).update(value).digest("hex")
    console.log('hmac--',hmac.toString("base64"))
    return hmac.toString("base64")
}


const hmacVal = getHmac(process.env.PID, ymd)

export { hmacVal }
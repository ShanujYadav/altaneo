const validatePhone = (phone) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone)
}

const validatePan = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    return panRegex.test(pan);
}


const validateGst = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9][Z][A-Z0-9]$/;
    return gstRegex.test(gst);
}

export { validatePhone, validatePan, validateGst }
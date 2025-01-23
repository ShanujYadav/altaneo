import nodemailer from 'nodemailer'

const sendApprovedEmail = (name, businessName, uploadAt, docId) => {
  return `
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden; position: relative; padding: 20px;">
    <img src="https://altaneologo.s3.ap-south-1.amazonaws.com/assets/icon/name.png" alt="Altaneo Finance Logo" style="position: absolute; top: 10px; right: 10px; width: 100px; height: auto" />
    <div style="padding: 0 20px 20px; margin-top: 60px;">
      <p style="margin: 0 0 10px;">Hi <strong>${name}</strong>,</p>
      <p style="margin: 0 0 10px;">We’ve got some great news to share!</p>
      <p style="margin: 0 0 10px;">Your loan application with <strong>Altaneo Finance Pvt. Ltd.</strong> has been approved. We know how important this step is for your business growth, and we’re thrilled to be part of your journey.</p>
      <div style="margin: 20px 0; padding: 10px; background-color: #f9f9f9;">
        <p style="margin: 5px 0;"><strong>Company Name:</strong> ${businessName}</p>
        <p style="margin: 5px 0;"><strong>Application ID:</strong> ${docId}</p>
        <p style="margin: 5px 0;"><strong>Date & Time of Application:</strong> ${uploadAt}</p>
      </div>
      <p style="margin: 0 0 10px;">Our team is already working to ensure a smooth and quick disbursement process for you. If you have any questions or need further assistance, don’t hesitate to reach out!</p>
      <p style="margin: 0 0 10px;">Congratulations once again! Let’s grow together.</p>
    </div>
    <div style="text-align: center; padding: 10px; background-color: #f1f1f1; font-size: 14px; color: #555;">
      <p style="margin: 5px 0;">Cheers,</p>
      <p style="margin: 5px 0;"><strong>Team Altaneo Finance Pvt. Ltd.</strong></p>
      <p style="margin: 5px 0;">📞 +91 9817741345</p>
      <p style="margin: 5px 0;">🌐 <a href="https://www.altaneofin.in" target="_blank" style="color: #0000FF; text-decoration: none;">www.altaneofin.in</a></p>
    </div>
  </div>
</body>`
}


const sendRegectedEmail = (name, businessName, uploadAt, docId) => {
  return `
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden; position: relative;">
    <img src="https://altaneologo.s3.ap-south-1.amazonaws.com/assets/icon/name.png" alt="Altaneo Finance Logo" style="position: absolute; top: 10px; right: 10px; width: 100px; height: auto;" />
    <div style="padding: 20px;">
      <p style="margin: 0 0 10px;">Hi <strong>${name}</strong>,</p>
      <p style="margin: 0 0 10px;">After carefully reviewing your loan application with <strong>Altaneo Finance Pvt Ltd</strong>, we regret to inform you that your application has not been approved at this time.</p>
      <div style="margin: 20px 0; padding: 10px; background-color: #f9f9f9;">
        <p style="margin: 5px 0;"><strong>Company Name:</strong> ${businessName}</p>
        <p style="margin: 5px 0;"><strong>Application ID:</strong> ${docId}</p>
        <p style="margin: 5px 0;"><strong>Date & Time of Application:</strong> ${uploadAt}</p>
      </div>
      <p style="margin: 0 0 10px;">We understand this may be disappointing, but please know that this decision was made after a thorough assessment of the provided information. If you would like to discuss this further or want to explore other financing options, our team is here to help.</p>
      <p style="margin: 0 0 10px;">Feel free to reach out to us for any clarifications or support.</p>
      <p style="margin: 0 0 10px;">Thank you for considering <strong>Altaneo Finance Pvt. Ltd.</strong>. We hope to serve you in the future.</p>
    </div>
    <div style="text-align: center; padding: 10px; background-color: #f1f1f1; font-size: 14px; color: #555;">
      <p style="margin: 5px 0;">Warm Regards,</p>
      <p style="margin: 5px 0;"><strong>Team Altaneo Finance Pvt. Ltd.</strong></p>
      <p style="margin: 5px 0;">📞 +91 9817741345</p>
      <p style="margin: 5px 0;">🌐 <a href="https://www.altaneofin.in" target="_blank" style="color: #0000FF; text-decoration: none;">www.altaneofin.in</a></p>
    </div>
  </div>
</body>`
}


const sendPendingEmail = (name, businessName, uploadAt, docId) => {
  return `
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden; position: relative;">
    <img src="https://altaneologo.s3.ap-south-1.amazonaws.com/assets/icon/name.png" alt="Altaneo Finance" style="position: absolute; top: 10px; right: 10px; width: 100px; height: auto;" />
    <div style="padding: 20px;">
      <p style="margin: 0 0 10px;">Hi <strong>Shanuj Yadav</strong>,</p>
      <p style="margin: 0 0 10px;">Thank you for choosing <strong>Altaneo Finance Pvt Ltd</strong> for your financial needs. We’re excited to assist you on this journey!</p>
      <p style="margin: 0 0 10px;">Your loan application is currently under review. Our team is carefully assessing the details to ensure we can provide you with the best possible solution.</p>
      <div style="margin: 20px 0; padding: 10px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;">
        <p style="margin: 5px 0;"><strong>Company Name:</strong> XYZ Pvt. Ltd.</p>
        <p style="margin: 5px 0;"><strong>Application ID:</strong> 1234567890</p>
        <p style="margin: 5px 0;"><strong>Date & Time of Application:</strong> 20th December 2024 at 11:00 AM</p>
      </div>
      <p style="margin: 0 0 10px;">We aim to complete the review process as quickly as possible. If we need any additional information, we’ll contact you promptly.</p>
      <p style="margin: 0 0 10px;">In the meantime, if you have any questions or need assistance, feel free to contact us. We’re here to help!</p>
      <p style="margin: 0 0 10px;">Thank you for trusting <strong>Altaneo Finance Pvt Ltd</strong>. We’ll keep you updated on the progress.</p>
    </div>
    <div style="text-align: center; padding: 10px; background-color: #f1f1f1; font-size: 14px; color: #555;">
      <p style="margin: 5px 0;">Warm Regards,</p>
      <p style="margin: 5px 0;"><strong>Team Altaneo Finance Pvt Ltd</strong></p>
      <p style="margin: 5px 0;">📞 +91 9817741345</p>
      <p style="margin: 5px 0;">🌐 <a href="https://www.altaneofin.in" target="_blank" style="color: #0000FF; text-decoration: none;">www.altaneofin.in</a></p>
    </div>
  </div>
</body>
`
}


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
})


export const sendEmail = async (name, businessName, email, uploadAt, status, docId) => {

  const mailOptions = {
    from: `"Altaneo Finance" <${process.env.NODEMAILER_USER}>`,
    to: email,
    subject: `${status == 'Approved' ? 'Congratulations 😃 Your Loan Application has been Approved !' : status == 'Rejected' ? 'Unfortunately ☹️ Your Loan Application has been Rejected !' : 'Your Loan Application is Under Review '} `,
    html: status == 'Approved' ? sendApprovedEmail(name, businessName, uploadAt, docId) : status == 'Rejected' ? sendRegectedEmail(name, businessName, uploadAt, docId) : sendPendingEmail(name, businessName, uploadAt, docId)
  }
  try {
    const info = await transporter.sendMail(mailOptions)
    let resp = info.response

    if (resp.includes("OK")) {
      return "OK"
    }
    else {
      return null
    }
  } catch (error) {
    console.error("Error sending email: ", error);
    return null
  }
}
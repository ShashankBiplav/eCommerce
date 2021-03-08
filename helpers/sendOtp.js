import axios from 'axios';

export const sendOtp = async (generatedOTP, phone) => {
  let url = `https://login.bulksmsgateway.in/sendmessage.php?user=${process.env.MSG_API_USERNAME}&password=${process.env.MSG_API_PASSWORD}&mobile=${phone}&message=${generatedOTP}&sender=MSGSAY&type=3&template_id=123`;
  try {
    return await axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

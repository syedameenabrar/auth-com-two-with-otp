const { logger, responser, AppError } = require('common-function-api');
const axios = require('axios');
const { SMS_API_KEY, FAST2SMS } = require('../../config/index');

module.exports.smsOTPV2 = async (payload) => {
    logger.info(payload.phoneOTP);
    try {
        const data = {
            variables_values: payload.phoneOTP,
            route: 'otp',
            numbers: payload.phoneNumber,
        };
        const configData = {
            method: 'post',
            url: FAST2SMS,
            headers: {
                authorization: SMS_API_KEY,
            },
            data: data,
        };
        const response = await axios(configData);
        logger.data('axios', response.data);
        return response;
    } catch (err) {
        const errData = err?.response?.data?.message;
        throw new AppError(400, 'Error', errData);
    }
};

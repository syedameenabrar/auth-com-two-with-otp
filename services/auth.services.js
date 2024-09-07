const { logger, AppError } = require('database-connection-function-com');
const userService = require('./user.services');
const bcrypt = require('bcryptjs');
const tokenService = require('../middlewares/token');
const { v4: uuidv4 } = require('uuid');
const { generateOTP } = require('../utils/utils');
const sms = require('./sms/fast2sms');

// register
module.exports.register = async (body) => {
    logger.info(`User registeration started`);
    // if (!body.email) {
    //     throw new AppError(404, 'Required Email', 'Email Required');
    // }
    if (!body.phoneNumber) {
        throw new AppError(
            404,
            'Required Phone Number',
            'Phone Number Required'
        );
    }
    //check email
    // const isEmailExist = await userService.findOneRecord({ email: body.email });
    // if (isEmailExist) throw new AppError(429, 'Already Email Is Exists');
    //check phoneNumber
    const isPhoneExist = await userService.findOneRecord({
        phoneNumber: body.phoneNumber,
    });

    if (isPhoneExist) {
        const resentOtp = await userService.updateRecord(
            { _id: isPhoneExist._id },
            { phoneOTP: generateOTP() }
        );
        console.log('resent otp', resentOtp);
        await sms.smsOTPV2(resentOtp);
        logger.info(resentOtp);
        isPhoneExist.phoneOTP = undefined;
        return isPhoneExist;
    }
    // const password = bcrypt.hashSync(body.password, 10);
    const phoneOTP = generateOTP();
    const uniqueUserName = `USER${uuidv4()
        .toUpperCase()
        .replace(/-/g, '')
        .substring(0, 9)}`;
    const payload = {
        username: uniqueUserName,
        fullName: body.fullName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        phoneOTP,
        accountType: body.accountType,
    };
    const user = await userService.createRecord(payload);
    console.log(payload);
    await sms.smsOTPV2(user);
    user.phoneOTP = undefined;
    const record = {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        accountType: user.accountType,
    };

    return record;
};

// login
module.exports.login = async (body) => {
    logger.info(`Login service started`);
    // if (!body.phoneNumber && !body.email) {
    //     throw new AppError(400, 'Email Or Username is Required');
    // }

    if (!body.phoneNumber || !body.phoneOTP) {
        throw new AppError(400, 'Email Or Username is Required');
    }

    const filter = { phoneNumber: body.phoneNumber, accountType: 'user' };
    const user = await userService.findOneRecord(filter);
    // const user = await userService.findOneRecord({
    //     $or: [{ phoneNumber: body.phoneNumber }, { email: body.email }],
    // });
    if (!user) {
        throw new AppError(404, 'User does not exist');
    }
    // const isPasswordValid = bcrypt.compareSync(body.password, user.password);
    // if (!isPasswordValid) {
    //     throw new AppError(401, 'Invalid user credentials');
    // }

    if (user.isBlocked) {
        throw new AppError(
            404,
            'You are not allowed to login. Contact Support'
        );
    }
    if (body.phoneOTP !== String(user.phoneOTP))
        throw new AppError(401, 'OTP not valid');

    await userService.updateRecord(
        { _id: user.id },
        { phoneOTP: null, phoneisVerified: true }
    );

    const loggedInUser = await userService.findOneRecord({ _id: user._id });
    const accessToken = tokenService.signToken(loggedInUser._id, 'access');
    const refreshToken = tokenService.signToken(loggedInUser._id, 'refresh');
    const record = {
        _id: loggedInUser._id,
        username: loggedInUser.username,
        email: loggedInUser.email,
        fullName: loggedInUser.fullName,
        accountType: loggedInUser.accountType,
        accessToken,
        refreshToken,
    };
    return record;
};

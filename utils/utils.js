// otp
module.exports.generateOTP = (digits = 5) => {
    const num = Math.pow(10, digits - 1);
    return Math.floor(num + Math.random() * 9 * num);
};

// trimFields
module.exports.trimFields = (body) => {
    for (const [key, value] of Object.entries(body)) {
        // Check if the value is a string before calling trim
        if (typeof value === 'string') {
            body[key] = value.trim();
        }
    }
};

// isPhone Format
module.exports.isPhone = (phoneNum) => {
    const regex = /^\d{8,10}$/; // minimum:8 or maximum:10 digit validation
    if (String(Number(phoneNum)).match(regex)) {
        return true;
    }
    return false;
};

// isEmail Format
module.exports.isEmail = (email) => {
    if (
        email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    ) {
        return true;
    }
    return false;
};

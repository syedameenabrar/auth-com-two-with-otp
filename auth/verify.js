const jwt = require("jsonwebtoken");
const config = require("../config/index.js");
const userService = require("../services/user.services.js");
const { logger, AppError, } = require("common-function-api")
// const { catchError } = require("common-function-api").catchError
const {catchError} = require("../utils/catchError.js")

module.exports.verifyJWT = catchError(async (req, _, next) => {
    logger.info(`Checking Jwt Middleware`);
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        logger.data("Token", token);
        if (!token) {
            throw new AppError(401, "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        const user = await userService.findOneRecord(decodedToken?._id);
        if (!user) {
            throw new AppError(401, "Invalid Access Token");
        }
        req.user = user;
        req.userId = user._id;
        next();
    } catch (error) {
        throw new AppError(401, error?.message || "Invalid access token");
    }
});

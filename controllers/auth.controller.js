const authService = require("../services/auth.services");
const { logger, responser } = require("common-function-api")

module.exports.register = async (req, res) => {
    logger.info("Creating The Register");
    const reqData = req.body;
    const data = await authService.register(reqData);
    logger.data("successfully register created", data);
    return responser.send(200, "successFully User Registed", req, res, data);
};

module.exports.login = async (req, res) => {
    logger.info("Creating The Login");
    const reqData = req.body;
    const data = await authService.login(reqData);
    logger.data("successfully user login", data);
    return responser.send(200, "successfully user login", req, res, data);
};

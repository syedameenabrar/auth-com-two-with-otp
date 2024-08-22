const userService = require("../services/user.services");
const { logger, responser } = require("common-function-api")

module.exports.getAllUsersPublic = async (req, res) => {
    logger.info("getAllUsersPublic");
    const query = req.query;
    const data = await userService.getAllUsersPublic(query);
    logger.data("successfully register created", data);
    return responser.send(200, "successFully all user fetched", req, res, data);
};

module.exports.getOneUserPublic = async (req, res) => {
    logger.info("getOneUserPublic");
    const param = req.params;
    const data = await userService.getOneUserPublic(param.userId);
    logger.data("successfully user login", data);
    return responser.send(200, "successfully single user fetch ", req, res, data);
};

module.exports.profile = async (req, res) => {
    logger.info("profile");
    const query = req.query;
    const userId = req.userId;
    const data = await userService.profile(userId);
    logger.data("successfully profile Fetched", data);
    return responser.send(200, "successfully profile Fetched", req, res, data);
};

module.exports.updateUser = async (req, res) => {
    logger.info("update user");
    const param = req.params;
    const reqData = req.body;
    const data = await userService.updateUser(param.userId, reqData);
    logger.data("successfully user login", data);
    return responser.send(200, "successfully user updated", req, res, data);
};

module.exports.deleteUser = async (req, res) => {
    logger.info("delete user");
    const param = req.params;
    const data = await userService.deleteUser(param.userId);
    logger.data("successfully user login", data);
    return responser.send(200, "successfully user delete", req, res, data);
};

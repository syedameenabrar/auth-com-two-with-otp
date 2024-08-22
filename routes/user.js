const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
// const { catchError } = require("common-function-api")
const {catchError} = require("../utils/catchError")
const authorized = require("../auth/verify");

userRouter.route("/getAllUserPublic").get(catchError(userController.getAllUsersPublic));
userRouter
    .route("/getOneUserPublic/:userId")
    .get(catchError(userController.getOneUserPublic));
userRouter
    .route("/profile")
    .get(authorized.verifyJWT, catchError(userController.profile));

userRouter
    .route("/update/:userId")
    .patch(authorized.verifyJWT, catchError(userController.profile));
userRouter
    .route("/delete/:userId")
    .delete(authorized.verifyJWT, catchError(userController.profile));

module.exports = userRouter;

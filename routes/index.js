const authRouter = require("./auth");
const userRouter = require("./user");

const routes = (app) => {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
};

module.exports = routes;

// api routers
module.exports.authRoutes = require("./routes/index")
// this.authRoutes()

module.exports.tokenType = require("./middlewares/token")
// this.tokenType.signToken()

module.exports.authorized = require("./auth/verify");
// this.authorized.verifyJWT

// 1. config
// 2. auth+user apis
// 3. middleware function
// 4. verify token

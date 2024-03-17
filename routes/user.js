const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
//signup form
.get(userController.renderSignUpForm)
//signup submit
.post(wrapAsync(userController.signUp));

router.route("/login")
// login form
.get(userController.renderLoginForm)
// login submit
.post(
saveRedirectUrl,
passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}),
userController.login);

// logout
router.get("/logout", userController.logout);

module.exports = router;
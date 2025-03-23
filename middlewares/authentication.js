const { validateToken } = require("../services/authentication");
const User = require('../models/user');

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        if (!tokenCookieValue) {
            // return res.redirect("/signin");
            return next();
        }


        try {
            const userPayload = validateToken(tokenCookieValue);
            const user = userPayload;
            req.user = user;
            // console.log("userPayload", userPayload);

            // console.log("User", user);

        } catch (error) {
            req.user = null;
        }
        return next();

    }

}

module.exports = checkForAuthenticationCookie
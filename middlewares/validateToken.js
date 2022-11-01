// Custom middleware for authorization of the user before exposing to any APIs

var jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const db = require("../models");
dotenv.config();

const User = db.models.users;

const validateToken = async (req, res, next) => {
    const auhorizationHeader = req.headers.authorization;
    let result;

    if (!auhorizationHeader) {
        return res.status(401).json({
            error: true,
            message: "Access token is missing",
        });
    }

    const token = req.headers.authorization.split(" ")[1];

    const options = {
        expiresIn: "24h",
    };

    try {
        let user = await User.findOne({
            accessToken: token,
        });

        console.log("USER");
        console.log(user);

        if (!user) {
            result = {
                error: true,
                message: "Authorization error",
            };

            return res.status(403).json(result);
        }

        result = jwt.verify(token, process.env.secret_key, options);

        if (!user.user === result.user) {
            result = {
                error: true,
                message: "Invalid token",
            };

            return res.status(401).json(result);
        }
        req.decoded = result;

        next();
    } catch (error) {
        console.error(error);

        if (error.name === "TokenExpiredError") {
            return res.status(403).json({
                error: true,
                message: "Token expired",
            });
        }

        return res.status(403).json({
            error: true,
            message: "Authentication error",
        });
    }
}

module.exports = validateToken;
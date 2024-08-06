const User = require('../models/User');
const jwt = require('jsonwebtoken')

//AUTHENTICATION
const isAuthenticated = async (req, res, next) => {
    console.log("Cookies:", req.cookies);

    // First, check the token in the cookies
    let token = req.cookies.token;
    console.log("Token:", token);

    // If the token is not in the cookies, check the Authorization header
    if (!token && req.headers["authorization"]) {
        const authHeader = req.headers["authorization"];
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(" ")[1];
        }
    }

    console.log("Authentication token:", token);

    if (!token) {
        return res.status(401).send("User is not authenticated!");
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        // Find the user by ID
        const user = await User.findByPk(decoded.id); // Use findByPk for Sequelize

        if (!user) {
            return res.status(401).send("User not found!");
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).send("Invalid token!");
    }
};



//AUTHORIZATION


const isAuthorized = (...roles) => {
    return async (req, res, next) => {
        try {
            // Check if req.user is set
            if (!req.user) {
                return res.status(401).send('User not authenticated');
            }

            // Retrieve user from the database to check isAdmin
            const user = await User.findOne({ where: { id: req.user.id } });

            if (!user) {
                return res.status(404).send('User not found');
            }

            // Check if the user is admin
            if (!user.isAdmin) {
                return res.status(403).send('User is not authorized');
            }

            // If no roles are provided, just check isAdmin
            if (roles.length === 0) {
                return next();
            }


            next();
        } catch (error) {
            console.error(error);
            res.status(500).send('Error from authorized side');
        }
    };
};

module.exports = { isAuthenticated, isAuthorized };


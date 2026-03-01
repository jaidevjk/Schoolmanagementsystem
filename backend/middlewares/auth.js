const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token || req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "schoolSecretKey", (err, user) => { // Using hardcoded secret for now, should be env var
            if (err) return res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === "SuperAdmin" || req.user.role === "Admin") {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

const verifyTokenAndSuperAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "SuperAdmin") {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "SuperAdmin" || req.user.role === "Admin") {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

const verifyTokenAndTeacher = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "SuperAdmin" || req.user.role === "Admin" || req.user.role === "Teacher") {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndSuperAdmin,
    verifyTokenAndAdmin,
    verifyTokenAndTeacher
};

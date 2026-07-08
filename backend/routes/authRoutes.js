const express = require("express");

const router = express.Router();

const { register,login,profile } = require("../controllers/authController");

const { registerValidation,loginValidation } = require("../validations/authValidation");

const {verifyToken} = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
    "/register",
    registerValidation,
    register
);

router.post(
    "/login",
    loginValidation,
    login
);

router.get(
    "/profile",
    verifyToken,
    profile
);

router.get(
    "/admin",
    verifyToken,
    authorizeRoles("Admin"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Admin",
            user: req.user
        });

    }
);

module.exports = router;
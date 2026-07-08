const { validationResult } = require("express-validator");
const authService = require("../services/authService");
const { successResponse, errorResponse } = require("../utils/response");

const register = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array(), 400);
    }

    try {

        const result = await authService.registerUser(req.body);

        return successResponse(
            res,
            result.message,
            null,
            201
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            400
        );

    }

};


const login = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array(), 400);
    }

    try {

        const result = await authService.loginUser(
            req.body.email,
            req.body.password
        );

        return successResponse(
            res,
            "Login successful",
            result
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            401
        );

    }

};

const profile = async (req, res) => {
    return successResponse(
        res,
        "Profile fetched successfully",
        req.user
    );
};

module.exports = {
    register,
    login,
    profile
};
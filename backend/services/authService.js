const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const registerUser = async (userData) => {

    const existingUser = await userModel.findUserByEmail(userData.email);

    if (existingUser.length > 0) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    userData.role = "Sales";

    await userModel.createUser(userData);

    return {
        message: "User registered successfully"
    };
};

const loginUser = async (email, password) => {

    const users = await userModel.findUserByEmail(email);

    if (users.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return {
        token,
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        }
    };
};


module.exports = {
    registerUser,
    loginUser
};
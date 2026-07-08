const db = require("../config/db");

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO users
            (first_name,last_name,email,password,role)
            VALUES (?,?,?,?,?)`,
            [
                user.first_name,
                user.last_name,
                user.email,
                user.password,
                user.role
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

module.exports = {
    findUserByEmail,
    createUser
};
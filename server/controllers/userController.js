const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require('../roles');
const { json } = require('body-parser');

async function hashPassword(password) {
    return await bcrypt.hash(password, 8);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.register = async(req, res, next) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            if (role == "user" || role == "admin" || role == null) {
                const hashedPassword = await hashPassword(password);
                const newUser = new User({ username, password: hashedPassword, role: role || "user" });
                const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                });
                newUser.accessToken = accessToken;
                await newUser.save();
                res.json({
                    data: newUser,
                    message: "User has been registered successfully"
                });
            } else {
                res.json({
                    error: "Wrong role."
                })
            }
        } else {
            res.json({
                error: "Username has been used. Please try again with another username."
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.login = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            res.json({
                error: "User not found!"
            })
            return;
        }
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) {
            res.json({
                error: "Incorrect password."
            })
            return;
        }
        const accessToken = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        res.status(200).json({
            data: { username: user.username, role: user.role },
            accessToken
        })
    } catch (error) {
        next(error);
    }
}

exports.getUsers = async(req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}

exports.getMyData = async(req, res, next) => {
    const user = res.locals.loggedInUser;
    res.status(200).json({
        data: user
    });
}

exports.getUser = async(req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username });
        if (!user) {
            res.json({
                error: "User not found!"
            })
        }
        res.status(200).json({
            data: { username: user,username, role: user.role }
        });
    } catch (error) {
        next(error);
    }
}

exports.getUserAdmin = async(req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username });
        if (!user) {
            res.json({
                error: "User not found!"
            })
            return;
        }
        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error);
    }
}


exports.updateUser = async(req, res, next) => {
    try {
        if (req.body.password != null) {
            req.body.password = await hashPassword(req.body.password);
        }
        const update = req.body;
        const username = req.params.username;
        const role = req.body.role;
        const foundUser = await User.findOne({ username });
        if (role != "admin" && role != "user") {
            res.json({
                message: "Wrong role."
            });
            return;
        }
        await User.findByIdAndUpdate(foundUser._id, update);
        const user = await User.findById(foundUser._id);
        res.status(200).json({
            data: user,
            message: 'User has been updated'
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async(req, res, next) => {
    try {
        const username = req.params.username;
        await User.findOneAndDelete({ username });
        res.status(200).json({
            data: null, 
            message: 'User has been deleted'
        });
    } catch (error) {
        next(error);
    }
}

exports.grantAccess = function(action, resource) {
    return async(req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "Yout don't have enough permission to perform this action"
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

exports.allowIfLoggedIn = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user)
        return res.status(401).json({
            error: "You need to log in first to access this route!"
        });
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}
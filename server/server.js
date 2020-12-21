const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');
const routes = require('./routes/route');
const { access } = require('fs');
const { findOne } = require('./models/userModel');
const app = express();
const PORT = 3000;

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

mongoose.connect('mongodb://mongo:27017/serveutask', {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to the database successfully');
    });

async function generateAdmin() {
    const userAdmin = await User.findOne({ username: "admin"});
    if (!userAdmin) {
        const adminPassword = "admin123";
        const hashedAdminPassword = await bcrypt.hash(adminPassword, 8);
        const firstAdmin = new User({ username: "admin", password: hashedAdminPassword, role: "admin" });
        const accessToken = jwt.sign({ userId: firstAdmin._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        firstAdmin.accessToken = accessToken; 
        await firstAdmin.save();
        console.log("Admin created!");
    } 
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(async(req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers['x-access-token'];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);

        // Check if the token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({
                error: "JWT token has expired, please login to obtain a new token"
            });
        }
        res.locals.loggedInUser = await User.findById(userId);
        next();
    } else {
        next();
    }
});

app.use('/', routes);
generateAdmin();
app.listen(PORT, () => {
    console.log('Server is listening on PORT: ', PORT);
});

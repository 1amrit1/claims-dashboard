const bcrypt = require('bcrypt');
const url = require('url');
const userModel = require('../model/userModel');
const fileController = require('../controller/fileController');

module.exports.loginCheck = async function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    console.log(userName);
    console.log(password);
    var user = await userModel.get_1_user(userName);
    if (user) {

        // // Load hash from your password DB.
        console.log("pass : " + user.password);
        bcrypt.compare(password, user['password'], function (err, result) {
            if (result) {
                if (user['isAdmin']) {
                    fileController.renderAllFiles(req, res);
                } else {
                    res.render('fileUpload');
                }

            } else {
                //use ejs to send error to frntEnd and use ejs template in h1 if error is there
                res.render('loginPage', { error: "username and/or password doesn't match!" });
            }
            res.end;
        });
    } else {
        res.render('loginPage', { error: "username and/or password doesn't match!" });
        res.end;

    }

}

module.exports.renderLoginPage = function (req, res) {
    res.render('login');
}

// addUser = async function (userName, password, isAdmin) {


//     try {
//         var result = await userModel.insert_1_user(userName, password, isAdmin);
//         console.log(result);
//     } catch (err) {
//         console.log(err);
//     }
// }

// addUser("admin","12345",true);
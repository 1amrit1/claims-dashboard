
const fileController = require('./controller/fileController');
const authController = require('./controller/authController');
var path = require('path');


var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser');
var multer = require("multer");

var upload = multer({ dest: './public/data/uploads/' });

var app = express();

//for ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//for css
app.use(express.static(__dirname + '/public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());



// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded



//static folder
app.use(express.static('public'));

app.get('/', authController.renderLoginPage);
app.post('/loginCheck', authController.loginCheck);

app.get('/uploadFile', fileController.renderUploadFile);

app.post("/sendFile", upload.single('file'), fileController.uploadFile);

app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
});
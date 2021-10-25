const excelToJson = require('convert-excel-to-json');
const fileModel = require('../model/fileModel');

module.exports.renderUploadFile = function (req, res) {
    res.render('fileUpload')

}

module.exports.uploadFile = function (req, res) {

    //text fields
    // console.log(req.body);

    //file contents
    console.log(req.file);


    const result = excelToJson({
        sourceFile: req.file.path
    });


    console.log(result['Sheet1']);


    // process
    var ress = fileModel.insert_1_file(result['Sheet1']);

    var response = 'Do something';
    res.redirect('/');

}

module.exports.renderAllFiles = async function (req, res) {
    var allFiles = await fileModel.getAllFiles();
    var allFilesArrOut = [];
    if (allFiles) {

        //getting all cols
        var headingArr = [];
        var totalCols = 0;
        for (let i = 0; i < allFiles.length; i++) {
            for (let j = 0; j < allFiles[i].length; j++) {
                if (j == 0) {
                    var keys = Object.keys(allFiles[i][j]);
                    let colObj = allFiles[i][j];
                    for (let k = 0; k < keys.length; k++) {
                        if (headingArr.includes(colObj[keys[k]])) {
                        } else {
                            headingArr.push(colObj[keys[k]]);
                        }
                    }

                }

            }
        }
        allFilesArrOut.push(headingArr);
        console.log(headingArr);
        console.log("========================");
        //puting the rest of rows
        for (let i = 0; i < allFiles.length; i++) {

            var singleExcelHeading = [];

            for (let j = 0; j < allFiles[i].length; j++) {

                if (j == 0) {
                    var keys = Object.keys(allFiles[i][j]);
                    let colObj = allFiles[i][j];

                    for (let k = 0; k < keys.length; k++) {
                        singleExcelHeading.push(colObj[keys[k]]);
                    }
                    console.log(singleExcelHeading);
                }

                else {
                    var individualRow = [];
                    var keys = Object.keys(allFiles[i][j]);
                    let colObj = allFiles[i][j];
                    for (let k = 0; k < keys.length; k++) {
                        let keyHeading = allFiles[i][0][keys[k]];
                        let headingIndx = headingArr.indexOf(keyHeading);
                        individualRow.splice(headingIndx, 0, colObj[keys[k]]);
                    }
                    allFilesArrOut.push(individualRow);

                }
            }

        }
        console.log(allFilesArrOut);
        res.render("viewData", { "data": allFilesArrOut });
    } else {
        console.log("books were nt found")

    }
}

// renderAllFiles();
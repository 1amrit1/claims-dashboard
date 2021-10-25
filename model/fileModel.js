const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admin:qwerty123@cluster0.h7iox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "claimsApplication";
const client = new MongoClient(url);


module.exports.insert_1_file = async function (fileObj) {

    var res;
    try {
        fileObj = { fileEntry: fileObj }
        await client.connect();
        res = await client.db(db_name).collection("claimFiles").insertOne(fileObj);
        console.log(res);
    }
    catch (e) {
        console.log(e);
    } finally {
        client.close();
    }
    return res;
}


module.exports.getAllFiles = async function (fileObj) {

    var res = [];
    try {
        await client.connect();
        result = await client.db(db_name).collection("claimFiles").find().toArray();

        if (result) {
            for (let i = 0; i < result.length; i++) {
                res[i] = result[i]['fileEntry'];
            }

        } else {
            console.log("no data of book for get_all_books method");
        }
        console.log(res);
        client.close();
    } catch (e) {
        console.log(e);

    } finally {
        await client.close();
    }
    return res;
}


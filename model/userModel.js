const bcrypt = require('bcrypt');
const saltRounds = 10;
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admin:qwerty123@cluster0.h7iox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "claimsApplication";
const client = new MongoClient(url);

//read one
module.exports.get_1_user = async function (userName) {
    var res;

    try {

        await client.connect();
        var res = await client.db(db_name).collection("users").findOne({ "userName": userName });
        if (res) {
            console.log(res);
        } else {
            console.log("no data");
        }
    } catch {

    } finally {
        await client.close();
    }

    return res;


}

//create
module.exports.insert_1_user = async function (userName, password, isAdmin) {
    var res;
    console.log("in insert user");

    var passwordHash;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        passwordHash = hash;
        var userObj = { "userName": userName, "password": passwordHash, "isAdmin": isAdmin };

        await client.connect();
        res = await client.db(db_name).collection("users").insertOne(userObj);
        console.log(res + "-----------------in insert user")
        console.log(res);
        client.close();
        return true;
    });
}

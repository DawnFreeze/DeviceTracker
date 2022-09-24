require('dotenv').config()

var AWS = require("aws-sdk");
var CFG = require('dotenv').config();

AWS.config.update({
    "region": process.env.DDB_REGION,
    "accessKeyId": process.env.DDB_ACCESSKEY,
    "secretAccessKey": process.env.DDB_SECRETKEY
});

const params = { TableName: "TranspireDevices" }

function onScan(err, data) {
    if (err) {
        console.error("failed to scan table")
        console.log(err)
    } else {
        return JSON.stringify(data)
    }
}

module.exports = {
    getRecords: function () {
        let dc = new AWS.DynamoDB.DocumentClient()
        return dc.scan(params, onScan).promise()
    }
};
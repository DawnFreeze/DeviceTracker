/////////////////////////////////////////////////////////////////////////////////////
// UPDATESTATUS

const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'})

exports.handler = async (event, context, callback) => {

    //let data = JSON.parse(Buffer.from(event.body, 'base64').toString('ascii'))
    let data = JSON.parse(event.body.toString('ascii'))
    let response = await updateRecord(data)
    
    return response
};

async function updateRecord(_data){

    let params = {
        TableName: 'TranspireDevices',
        Item: {
            'TranspireCode': _data.transpirecode,
            'DeviceID': _data.deviceid,
            'OS': _data.os,
            'Model': _data.model,
            'OSVersion': _data.osversion,
            'Allocation': _data.allocation,
            'Passcode': _data.passcode,
            'Project': _data.project,
            'InUse': _data.inuse,
            'ScreenSize': _data.screensize,
            'DateConfirmed': _data.dateconfirmed
        }
    }
  
    let res = null
    await ddb.put(params, (err) => {
        if (err) { 
            res = {
                statusCode: 200,
                body: JSON.stringify({message: "failed to update record"})
            };
        } else { 
            res = {
                statusCode: 200,
                body: JSON.stringify({message: "record updated"})
            };
        }
    }).promise();
    
    return res
};

/////////////////////////////////////////////////////////////////////////////////////
// GETUSER

const AWS = require('aws-sdk')
//const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'})

exports.handler = async (event, context, callback) => {

    //console.log(event.body.toString('ascii'))
    //let pin = JSON.parse(Buffer.from(event.body, 'base64').toString('ascii')).pin
    
    let pin = JSON.parse(event.body.toString('ascii')).pin

    let response = await getUserRecord(pin)
    return response
};

async function getUserRecord(_pin){

    var params = {
        TableName: 'Users',
        Key: { 'Pin': _pin }
    }
  
    let res = null
    await ddb.get(params, (err, data) => {
        if (err) { 
            res = {
                statusCode: 500,
                body: "{}"
            };
        } else if (JSON.stringify(data) === JSON.stringify({})) {
             res = {
                statusCode: 404,
                body: "{}"
            };
        } else { 
            res = {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        }
    }).promise();
    
    return res
};

/////////////////////////////////////////////////////////////////////////////////////
// GETDEVICEDATA

const AWS = require('aws-sdk')
//const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'})

exports.handler = async (event, context, callback) => {

    let response = await getDevices()
    return response
};

async function getDevices(){

    var params = {
        TableName: 'TranspireDevices'
    }
  
    let res = null
    await ddb.scan(params, (err, data) => {
        if (err) { 
            res = {
                statusCode: 200,
                body: "{}"
            };
        } else { 
            res = {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        }
    }).promise();
    
    return res
};
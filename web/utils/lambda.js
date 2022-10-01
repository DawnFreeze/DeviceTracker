// GetDeviceData ===========================================================

const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'})

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
                statusCode: 500,
                body: "{}"
            };
        } else { 
            res = {
                statusCode: 200,
                //body: JSON.Stringify(data) - NOTE: removed for switch from HTTP API to secured REST
                body: data
            };
        }
    }).promise();
    
    return res
};

// HandleDeviceData ===========================================================

const AWS = require('aws-sdk')
//const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'})

exports.handler = async (event, context, callback) => {

    //let data = JSON.parse(Buffer.from(event.body, 'base64').toString('ascii'))
    //let data = JSON.parse(event.body.toString('ascii'))
    
    let data = JSON.parse(event.body)
    let response = await updateRecord(data)
    
    return response
};

async function updateRecord(_data){
    
    console.log(_data)

    let params = {
        TableName: 'TranspireDevices',
        Item: {
            'TranspireCode': _data.transpirecode,
            'AllocationID': _data.allocationid,
            'DeviceID': _data.deviceid,
            'DeviceCode': _data.devicecode,
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

// ValidateUserPin ===============================================================

const AWS = require('aws-sdk')
//const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'})

exports.handler = async (event, context, callback) => {

    //let pin = JSON.parse(Buffer.from(event.body, 'base64').toString('ascii')).pin
    //let pin = JSON.parse(event.body.toString('ascii')).pin
    let pin = JSON.parse(event.body).pin

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

// GetSingleDevice ===============================================================

const AWS = require('aws-sdk')
//const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'})

exports.handler = async (event, context, callback) => {

    //let devicecode = JSON.parse(Buffer.from(event.body, 'base64').toString('ascii')).devicecode
    //let devicecode = JSON.parse(event.body.toString('ascii')).devicecode
    let devicecode = JSON.parse(event.body).devicecode
    
    let response = await getDevice(devicecode)
    return response
};

async function getDevice(code){

    var params = {
        TableName: 'TranspireDevices',
        Key: { 'DeviceCode': code }
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
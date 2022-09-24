require('dotenv').config()

// NOTE: FIX THIS - REQUEST NEEDS TO BE ASYNC
var request = require('request')
var json = require('../../csvjson-min.json')

let ctr = 0
const url = 'https://' + process.env.API_HOST + '/live/updatestatus'
const proxy = "http://localhost:9001/live/updatestatus"

json.forEach(function(data){

    // proxy?
    let endpoint = true ? proxy : url
    console.log("sending to " + endpoint + "\n" + 
        (++ctr) + ":\n" + JSON.stringify(data))

    request({
        headers: { 
            'Host': process.env.API_HOST,
            'content-type': ''
        },
        uri: endpoint,
        json: data,
        method: 'POST'
      }, function (err, res, body) {
        console.log(res.body)
    });

    var waitTill = new Date(new Date().getTime() + 2000)
    while(waitTill > new Date()){}
})
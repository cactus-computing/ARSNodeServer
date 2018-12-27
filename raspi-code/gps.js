var request = require('request');
var jwt = require('jsonwebtoken');
var id = process.env.DEVICE_ID;

var host = process.argv[2];
if (!host) {
  console.log("Invalid host");
  return;
}

/*
var SerialPort = require('serialport');
var GPS = require('gps');

var port = new SerialPort('/dev/ttyS0', {
  baudRate: 9600
});

var gps = new GPS;

port.on('data', function(data) {
  gps.updatePartial(data);
});*/

var sendData = function() {
  var data = {
    lat: -33.2577297,
    lon: -70.7227942, 

    material: "carton",
    weight: 2
  };

  console.log(jwt.sign({id}, "dirtysocks", {noTimestamp: true}));
  request.post(host + "/events", 
    { json: data, 
      headers: { 
        // TODO: Make this an ENV variable
        "Authorization": "Bearer " + jwt.sign({id}, "dirtysocks", {noTimestamp: true})
      }
    }, (error, response, body) => {
      console.log(body);
    });
}

sendData();
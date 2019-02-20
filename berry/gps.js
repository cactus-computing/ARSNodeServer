var request = require('request');
var jwt = require('jsonwebtoken');
var config = require('./config.json')

var id = config.id;
var token = config.token;
var host = config.host;

var sendData = function() {
  var data = {
    lat: -33.2577297,
    lon: -70.7227942, 

    material: "carton",
    weight: 2
  };

  // TODO: Move this to AT commands to use the SIM module
  request.post(host + "/event", 
    { json: data, 
      headers: { 
        "Authorization": "Bearer " + token
      }
    }, (error, response, body) => {
      console.log(body);
    });
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
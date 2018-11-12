var host = process.argv[2];
if (!host) {
  console.log("Invalid host");
  return;
}

var SerialPort = require('serialport');
var request = require('request');
var GPS = require('gps');

var port = new SerialPort('/dev/ttyS0', {
  baudRate: 9600
});
 
var gps = new GPS;
 
port.on('data', function(data) {
  gps.updatePartial(data);
});

var sendData = function() {
  var data = {
    lat: gps.state.lat,
    lon: gps.state.lon, 

    material: "carton",
    weight: 2
  }
  
  request.post(host + "/events", 
    { json: data, 
      headers: { 
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXJkdWlubyIsImlkIjoiOWRraTgwIn0.tq00SmdY3F_907oAuvN6f9rPMKU0f9RTi5U41F3GCDw" 
      }
    }, (error, response, body) => {
      console.log(body);
    })
}

setTimeout(sendData, 5000);
var https = require('https');
var tessel = require('tessel');
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port.A);

// set up a loop when climate module is ready
climate.on('ready', function() {

    // loop forever
    setImmediate(function loop() {
        climate.readTemperature('f', function(err, temp) {
            climate.readHumidity(function(err, humid) {
                console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
                postToFireBase(temp.toFixed(4), humid.toFixed(4));
                setTimeout(loop, 1000);
            });
        });
    });
});

// climate module threw an error
climate.on('error', function(err) {
    console.log('error connecting module', err);
});

// Post the humidity and temperature to my firebase account:
function postToFireBase(temp, humid) {
    var req = https.request({
        port: 443,
        method: 'POST',
        hostname: 'FIREBASEACCOUNT.firebaseio.com',
        path: '/climate.json',
        headers: {
            "Host": "FIREBASEACCOUNT.firebaseio.com",
            "Accept": "*/*",
            "User-Agent": "tessel"
        }
    }, function(res) {
        console.log('statusCode: ', res.statusCode);
    });

    req.write('{"datetime": ' + new Date().getTime() + ', "temp": ' + temp + ', "humid": ' + humid + '}');
    req.write('\r\n');
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });
}
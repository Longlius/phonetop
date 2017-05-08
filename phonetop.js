var fs = require('fs');
var monitor = require('os-monitor');
var Twilio = require('./node_modules/twilio/lib');

// boolean to make sure we don't send too many messages
var messageSent = false;

// get hostname
var hostname = monitor.os.hostname();

// Read the configuration in from a file.
var config = JSON.parse(fs.readFileSync('phonetopconfig.json', 'utf8'));

// Twilio configuration (using environment variables)
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var token = process.env.TWILIO_AUTH_TOKEN;
var twilio = new Twilio(accountSid, token);
var tonumber = config.twilio.tonumber;
var fromnumber = config.twilio.fromnumber;

// Start the monitor
monitor.start(config.events.monitorconfig);

// Handler for event loadavg1
monitor.on('loadavg1', function(event) {
    console.log(event.type, ' Load average is exceptionally high!!!');
    if(!messageSent) {
		twilio.messages.create({
			from: fromnumber,
			to: tonumber,
			body: hostname + ": " + config.events.critical1.message
		}, function(err, result) {
			if(err){
				console.log("ERROR: " + JSON.stringify(err));
			} else {
				console.log('Created message using callback');
				console.log(result.sid);
			}
	});
	messageSent = true;
    }
});

// Handler for event loadavg5
monitor.on('loadavg5', function(event) {
    console.log(event.type, ' Load average is exceptionally high!!!');
    if(!messageSent) {
		twilio.messages.create({
			from: fromnumber,
			to: tonumber,
			body: hostname + ": " + config.events.critical5.message
		}, function(err, result) {
			if(err){
				console.log("ERROR: " + JSON.stringify(err));
			} else {
				console.log('Created message using callback');
				console.log(result.sid);
			}
	});
	messageSent = true;
    }
});

// Handler for event loadavg15
monitor.on('loadavg15', function(event) {
    console.log(event.type, ' Load average is exceptionally high!!!');
    if(!messageSent) {
		twilio.messages.create({
			from: fromnumber,
			to: tonumber,
			body: hostname + ": " + config.events.critical15.message
		}, function(err, result) {
			if(err){
				console.log("ERROR: " + JSON.stringify(err));
			} else {
				console.log('Created message using callback');
				console.log(result.sid);
			}
	});
	messageSent = true;
    }
});

// Handler for event freemem
monitor.on('freemem', function(event) {
    console.log(event.type, ' Free memory is very low.');
    if(!messageSent) {
		twilio.messages.create({
			from: fromnumber,
			to: tonumber,
			body: hostname + ": " + config.events.freemem.message
		}, function(err, result) {
			if(err){
				console.log("ERROR: " + JSON.stringify(err));
			} else {
				console.log('Created message using callback');
				console.log(result.sid);
			}
	});
	messageSent = true;
    }
});


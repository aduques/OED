var http = require('http');
var parseString = require('xml2js').parseString;
var url = "http://144.89.8.12/sm101.xml";
var val = '';
function getXML(url, callback) {
	var req = http.get(url, function (res) {
		// save the data
		var xml = '';
		res.on('data', function (chunk) {
			xml += chunk;
		});
		res.on('end', function () {
			// parse xml
			parseString(xml, function (err, result) {
				val = result['Maverick']['NodeID'][0];
				callback(val);
			})
		});
	});

	req.on('error', function (err) {
		// debug error
	});
}

function parseAll(callback) {

	for (var i = 10; i <= 22; i++) {
		url = 'http://144.89.8.' + i + '/sm101.xml';
		getXML(url, function () {
			var ip = url.match(/^.*?(\d+\.\d+\.\d+\.\d).*/)[1]; //matches an ip address
			var meter = {'name': val, 'ip': ip};
			callback(meter);
		});
	}

}
exports.parseXML = parseAll;
//parseAll();

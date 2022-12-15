var http = require("http");


//this method initiates
exports.handler = function (event, context, callback) {

	var headers = event.headers;
	var queryStringParameters = event.queryStringParameters;
	var pathParameters = event.pathParameters;
	var stageVariables = event.stageVariables;
	var arnV = event.methodArn;
	var tokenWithBearer = headers.Authorization

	var token = tokenWithBearer.substring(7, tokenWithBearer.length);


	var val = '';
	const pathV = '/validate/' + token;

	var option = {
		host: '52.66.175.84',
		port: 8010,
		method: 'GET',
		path: pathV
	};
	http.request(option, function (res) {
		var body = '';
		res.on('data', function (chunk) {
			body += chunk;
			console.log('Got the data', body);

		});

		res.on('end', function () {
			val = JSON.parse(body);

			if (val === true) {
				callback(null, generateAllow('me', event.methodArn));
			} else {
				callback('Unauthorized')
			}

		})
		console.log('ENd of function', val);

	}).end();


}

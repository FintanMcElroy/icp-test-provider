'use strict'
// our dependencies
const express = require('express');
const app = express();
const router = express.Router();
// Get port from environment, default to 8081 if local
const serverPort = process.env.PORT || 8081;
const url = require('url');

// all routes prefixed with /api
app.use('/api', router);

// Need these to access req.body in the POST method 
router.use(express.json()); // support json encoded bodies
router.use(express.urlencoded({ extended: true })); // support url encoded bodies

// set the server to listen on the supplied port number
app.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));

router.post('/provider/greet', (req, res) => {
	console.log(`/api/provider/greet invoked ...`);
	console.log("req.body.lang: ", req.body.lang); 

	// construct a JSON payload "response"
	let response = {};
	switch (req.body.lang) {
		case "EN": {response.greeting = `Hi there, old chap!`; break;}
		case "DE": {response.greeting = `Guten tag, mein herr!`; break;}
		case "FR": {response.greeting = `Bon journee, Monsieur!`; break;}
		default: {response.greeting = `Hello, you did not supply a recognised language option`}
	}
	
	// is the same achieved with res.json(response) ?
	res.contentType('application/json');
	console.log(`/api/provider/greet about to return response: ${response.greeting}`);
	res.send(response);
	
});
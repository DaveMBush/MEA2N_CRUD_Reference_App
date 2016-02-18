// get an express app instance new'd up
var express = require('express');
require('./server/db');
var app = express();

// need body parser setup for REST calls
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// This is all we need to load static
// files.  As long as we don't specify
// a default route, this should serve
// index.html out of www
app.use(express.static(__dirname + '/www'));
app.use('/node_modules',express.static(__dirname + '/node_modules'));
// routes for our api
var router = require('./server/api/router');

// more routes for our API will happen here
var contactRoutes = require('./server/api/contact');

// all of our routes will be prefixed with /api
app.use('/api',contactRoutes);
app.use('/api', router);

// This comes last.  right before we start listening
app.use(function(req,res){
    // this sends back the index.html file when
    // it looks like they are looking for
    // a client side route
    // assuming a real file will have an extension and a route will not.
    if(req.url.indexOf('.')> -1){
        res.status(404)        // HTTP status 404: NotFound
            .send('Not found');
    }
    else {
        res.sendFile(__dirname + '/www/index.html');
    }
});

// listen on port 1337
app.listen(1337);
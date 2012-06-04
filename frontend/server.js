#!/usr/bin/env node
var express = require('express');
var client = require('rest-sugar-client');

// TODO: move to config and hide from repo
var APIKEY = 'dummy';
var BACKEND_URL = 'http://localhost:8000/api/v1/';

main();

function main() {
    // TODO: set up ssl for production
    var app = express.createServer();

    client.api(BACKEND_URL + '?apikey=' + APIKEY, function(api) {
        console.log('success');
        console.log(api);

        /* demo
        api.task.create({apikey: APIKEY, description: 'dummy todo'},
            function(d) {console.log('ok', d);},
            function(e) {console.log('err, e);}
        );
        */

        // initServer(api)
    }, function(err) {console.log(err);});
}

function initServer(api) {
    var app = express.createServer();

    app.get('/', function(req, res) {
        // TODO: render some page + set up basic actions
    });

    var port = 4000;
    console.log('Surf to localhost:' + port);
    app.listen(port);
}


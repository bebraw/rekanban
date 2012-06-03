#!/usr/bin/env node
var express = require('express');
var rest = require('request');

// TODO: move to config and hide from repo
var APIKEY = 'dummy';
var BACKEND_URL = 'http://localhost:8000/api/v1/';

main();

function main() {
    // TODO: set up ssl for production
    var app = express.createServer();

    getMeta(BACKEND_URL + '?apikey=' + APIKEY, function(d) {
        var api = constructAPI(BACKEND_URL, d);
        console.log(api);
        // initServer(api);
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

function getMeta(url, okCb, errCb) {
    rest.get(url, function(err, d) {
        if(err) errCb(err);
        else okCb(JSON.parse(d.body));
    });
}

function constructAPI(url, d) {
    var ret = {};

    for(var k in d) {
        var v = d[k];
        var name = k.slice(0, -1);

        ret[name] = get;
        ret[name].create = create;
        ret[name].update = update;
        ret[name]['delete'] = del;
    }

    function get(o) {
        // TODO: all, id, props
        // TODO: collection ops (ie. boards(id).columns.<op>
    }

    function create(o) {
        // TODO: create with o fields
    }

    function update(o) {
        // TODO: update with o fields
    }

    function del(id) {
        // TODO: delete with given id
    }

    return ret;
}


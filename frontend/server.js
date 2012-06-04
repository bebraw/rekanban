#!/usr/bin/env node
var express = require('express');
var rest = require('request');
var fkit = require('funkit');

// TODO: move to config and hide from repo
var APIKEY = 'dummy';
var BACKEND_URL = 'http://localhost:8000/api/v1/';

main();

function main() {
    // TODO: set up ssl for production
    var app = express.createServer();

    getMeta(BACKEND_URL + '?apikey=' + APIKEY, function(d) {
        var api = constructAPI(BACKEND_URL, d);

        /* demo
        api.task.create({apikey: APIKEY, description: 'dummy todo'},
            function(d) {console.log('ok', d);},
            function(e) {console.log('err', e);}
        );
        */

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
    // TODO: make sure url has a trailing slash
    var ret = {};

    for(var k in d) {
        var v = d[k];
        var name = k.slice(0, -1);
        var r = url + k;

        // TODO: collection ops (ie. boards(id).columns.<op>)
        ret[name] = op('get', r);
        ret[name].count = op('get', r + 'count');
        ret[name].create = op('post', r);
        ret[name].update = op('put', r);
        ret[name]['delete'] = op('del', r);
    }

    function op(method, r) {
        return function(o, okCb, errCb) {
            if(fkit.isString(o)) {
                rest.get({url: r + o, qs: {method: method}}, handle(okCb, errCb));
            }
            else {
                o.method = method;
                rest.get(r + '?' + toQ(o), handle(okCb, errCb));
            }
        };
    }

    function handle(okCb, errCb) {
        return function(err, d) {
            if(err || d.statusCode != 200) errCb(err || d.body);
            else okCb(JSON.parse(d.body));
        };
    }

    function toQ(o) {
        var fields = o.fields? o.fields.join(','): '';
        delete o.fields;

        return fields + fkit.otozip(o).map(function(v) {
            return v[0] + '=' + v[1].split(' ').join('+');
        }).join('&');
    }

    return ret;
}


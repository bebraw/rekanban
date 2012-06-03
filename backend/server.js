#!/usr/bin/env node
var express = require('express');
var mongoose = require('mongoose');
var sugar = require('mongoose-sugar');
var rest = require('rest-sugar');
var models = require('./models');

// TODO: move to config and hide from repo
var APIKEY = 'dummy';

main();

function main() {
    mongoose.connect('mongodb://localhost/rekanban');

    // TODO: set up ssl for production
    var app = express.createServer();

    // TODO: auth (enforce
    app.configure(function() {
        app.use(express.methodOverride()); // handles PUT
        app.use(express.bodyParser()); // handles POST
        app.use(app.router);
    });

    rest.init(app, '/api/v1/', {
        'boards': models.Board,
        'sections': models.Section,
        'tasks': models.Task
    }, sugar, rest.auth.key('apikey', APIKEY));

    console.log('Surf to localhost:8000');
    app.listen(8000);
}


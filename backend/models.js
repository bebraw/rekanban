var mongoose = require('mongoose');
var sugar = require('mongoose-sugar');

var schema = sugar.schema(mongoose);
var refs = sugar.refs;

exports.Board = schema('Board', {
    sections: refs('Section')
});

exports.Section = schema('Section', {
    name: {type: String, required: true},
    tasks: refs('Task')
});

// TODO: priority, type
exports.Task = schema('Task', {
    description: {type: String, required: true}
});


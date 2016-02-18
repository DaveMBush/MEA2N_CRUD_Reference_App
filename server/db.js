var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    require('./models/contact');
});

mongoose.connect('mongodb://localhost/contacts');
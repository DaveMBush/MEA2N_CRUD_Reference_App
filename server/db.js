var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    require('./models/contact');
});

mongoose.connect('mongodb://localhost/contacts');
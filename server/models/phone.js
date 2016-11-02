var mongoose = require('mongoose');
var phoneSchema = new mongoose.Schema({
    contactId: {type:String},
    phone: {type: String}
});

module.exports = mongoose.model('Phone',phoneSchema);


var mongoose = require('mongoose');
var contactSchema = new mongoose.Schema({
    name: {type:String},
    sex: {type: String},
    dob: {type: Date}
});

module.exports = mongoose.model('Contact',contactSchema);

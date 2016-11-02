
var mongoose = require('mongoose');
var Phone = mongoose.model('Phone').schema;
var contactSchema = new mongoose.Schema({
    name: {type:String},
    sex: {type: String},
    dob: {type: Date},
    phones: {type: [Phone]}
});

module.exports = mongoose.model('Contact',contactSchema);

var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var personSchema = new Schema({
    name: {
        first: String,
        last: String
    }
});

personSchema.virtual('name.full').get(function(){
    return this.name.first + ' ' + this.name.last;
});

personSchema.virtual('name.full').set(function(name){
    var splits = name.split(' ');
    this.name.first = splits[0];
    this.name.last = splits[1];
});

module.exports = mongoose.model('person',personSchema);

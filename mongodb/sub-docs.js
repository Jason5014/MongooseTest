var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var childSchema = new Schema({
    name: 'string'
    });

var parentSchema = new Schema({
        children: [childSchema]
    });


var Parent = mongoose.model('Parent',parentSchema);
/*
var parent = new Parent({
        children: [{name: 'Matt'},{name: 'Sarah'}]
    });

parent.children[0].name = 'Matthew';

parent.save(function(err,res){
    if(err)
        console.log("Error: "+err);
    else
        console.log("Res: "+ res);
});
*/

childSchema.pre('save', function(next){
    console.log(this.name);
    if('invalid' == this.name) return next(new Error('#sadpanda'));
    next(new Error("ok!"));
});

var parent = new Parent({
    children: [{name: 'invalid'}]
});

parent.save(function(err){
    console.log(this);
    console.log(err);
});

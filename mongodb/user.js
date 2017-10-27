var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, index: true},
    userpwd: { type: String},
    userage: { type: Number},
    logindate: { type: Date, default: Date.now}
});

var User = mongoose.model('User',UserSchema);

module.exports = User;
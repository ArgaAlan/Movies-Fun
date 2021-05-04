var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    usuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        default: ''
    },
    apellido: {
        type: String,
        default: ''
    },
    correo: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', User);
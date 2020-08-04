const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROL'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'EL nombre es Necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es Necesario']
    },
    password: {
        type: String,
        required: [true, 'El passwor es obligatorio']
    },
    img: {
        type: String,
        required: false
    }, //no es obligatoria 
    role: {
        type: String,
        default: 'USER_ROL',
        enum: rolesValidos
    }, //default: 'USER_ROL
    estado: {
        type: Boolean,
        default: true
    }, //Boolean
    google: {
        type: Boolean,
        default: false
    } //boolean
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('Usuario', usuarioSchema);
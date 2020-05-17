const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UsuarioSchema = new mongoose.Schema({
    Nome: {
        type: String,
        required: true,
    },
    Sobrenome: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        lowercase:true,
    },
    Senha: {
        type: String,
        required: true,
        select: false
    },
    UrlFoto:{
        type:String,
        required:false,
    },
    DataCriacao: {
        type: Date,
        default: Date.now
    }
});

UsuarioSchema.pre('save', function (next) {
    let usuario = this;
    if (!usuario.isModified('Senha'))
        return next();
    bcrypt.hash(usuario.Senha, 10, (err, bcrypt) => {
        usuario.Senha = bcrypt;
        return next();
    });
});

mongoose.model('Usuario',UsuarioSchema);
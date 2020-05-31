const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createUserToken = (UsuarioId) => {
    return jwt.sign({
        id: UsuarioId
    }, 'najuleflix');
};

module.exports = {
    async store(req, res) {
        try {
            const usuario = await Usuario.create(req.body);
            usuario.Senha = undefined;
            return res.status(201).json({
                usuario,
                token: createUserToken(usuario._id)
            })
        }
        catch (err) {
            return res.status(400).json({
                erro: err
            })
        }
    },
    async login(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Dados insuficientes'
            })
        }
        try {
            Usuario.findOne({ Email: email }, (err, usuario) => {
                if (err)
                    return res.status(400).json({ err });

                if (!usuario)
                    return res.status(400).json({ erro: 'login invalido' });

                bcrypt.compare(senha, usuario.Senha, (err, same) => {
                    if (!same)
                        return res.status(400).json({ erro: 'login invalido' });

                    usuario.senha = undefined;
                    return res.status(200).json({
                        usuario,
                        token: createUserToken(usuario._id)
                    })
                })
            }).select('+Senha');
        }
        catch (err) {
            return res.status(400).json({
                erro: err
            })
        }
    },
    async usuarioLogado(req, res) {
        try {
            const usuario = await Usuario.findById(res.locals.auth_data.id);
            return res.json({ usuario });
        }
        catch (err) {
            return res.status(400).json({
                erro: err
            })
        }
    },
    async uploadImage(req, res) {
        try {
            const usuario = await Usuario.updateOne({ _id: res.locals.auth_data.id },
                {$set: { UrlFoto: `files/${req.file.filename}` }});

                return res.status(200).json({
                    usuario
                });
        }
        catch (err) {
            return res.status(400).json({
                erro: err
            })
        }
    }
}
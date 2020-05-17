const mongoose = require('mongoose');
const Mensagem = mongoose.model('Mensagem');
module.exports = {
    async store(req, res) {
        try {
            const UsuarioId = res.locals.auth_data.id;
            req.body.Usuario = UsuarioId;
            const mensagem = await Mensagem.create(req.body);
            return res.status(201).json({
                mensagem
            })
        } catch (err) {
            return res.json({
                erro: err
            })
        }
    },
    async listarMensagens(req, res) {
        try {
            const mensagem = await Mensagem.find({});
            return res.status(201).json({
                mensagem
            })
        } catch (err) {
            return res.json({
                erro: err
            })
        }
    },
    async editarMensagem(req, res) {
        try {
            const mensagem = await Mensagem.updateOne({_id:req.params.id},
               {$set:{Conteudo:req.body.Conteudo}} );
            return res.status(201).json({
                mensagem
            })
        } catch (err) {
            return res.json({
                erro: err
            })
        }
    },
    async deletarMensagens(req, res) {
        console.log('deletar:', req.params.id);
        try {
            const mensagem = await Mensagem.findOne({_id: req.params.id}).remove().exec();
            mensagem.save();
            return res.status(200).json({
                mensagem:"Sucesso ao deletar a mensagem"
            })
        } catch (err) {
            return res.json({
                erro: err
            })
        }
    }
}
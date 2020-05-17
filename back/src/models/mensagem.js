const mongoose = require('mongoose');

const MensagemSchema = mongoose.Schema({
    Conteudo: {
        type: String,
        required: true
    },
    Usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    DataCriacao: {
        type: Date,
        default: Date.now
    },
    VisualizadaPor:{
        type: String,
        required: false
    }
})

mongoose.model('Mensagem', MensagemSchema);
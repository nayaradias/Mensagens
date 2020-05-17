const express = require('express');
const routes = express.Router();
const multer = require('./config/multer');
const autenticacaoController = require('./controllers/autenticacaoController');
const mensagemController = require('./controllers/mensagemController');
const auth = require('./middlewares/auth');
//Rotas do usuario
routes.post('/usuarios',autenticacaoController.store);
routes.post('/usuarios/login',autenticacaoController.login);
routes.get('/usuarios/info',auth,autenticacaoController.usuarioLogado);
//Rotas das mensagens
routes.post('/mensagens',auth,mensagemController.store);
routes.get('/mensagens',auth,mensagemController.listarMensagens);
routes.put('/mensagens/editar/:id',auth,mensagemController.editarMensagem);
routes.delete('/mensagens/deletar/:id',auth,mensagemController.deletarMensagens);
routes.post('/usuarios/imagem',auth,multer.single('imagem'),autenticacaoController.uploadImage);
module.exports = routes;

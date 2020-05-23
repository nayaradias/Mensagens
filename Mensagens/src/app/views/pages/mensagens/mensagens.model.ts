import { MensagemI } from 'src/app/core/interfaces/mensagem.interface';
import { UsuarioI } from 'src/app/core/interfaces/usuario.interface';

export class Mensagem implements MensagemI {
    Conteudo: string;
    Usuario: UsuarioI;
    DataCriacao: Date;
    VisualizadaPor: string;
    constructor(conteudo:string,usuario:UsuarioI,data?:Date,visualizadaPor?:string){
        this.Conteudo = conteudo;
        this.Usuario = usuario;
        this.DataCriacao = data;
        this.VisualizadaPor = visualizadaPor;
    }
}
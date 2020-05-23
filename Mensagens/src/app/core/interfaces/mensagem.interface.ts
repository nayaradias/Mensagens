import { UsuarioI } from './usuario.interface';

export interface MensagemI {
  Conteudo: string;
  Usuario: UsuarioI;
  DataCriacao: Date;
  VisualizadaPor: string;
}

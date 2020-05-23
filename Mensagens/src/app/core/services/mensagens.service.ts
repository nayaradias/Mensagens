import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UsuarioI } from '../interfaces/usuario.interface';
import { Route, Router } from '@angular/router';
import { MensagemI } from '../interfaces/mensagem.interface';
const api = environment.api;
@Injectable()
export class MensagemService {
  constructor(private http: HttpClient, private router: Router) {}
  token = localStorage.getItem('token');
  mensagemEditada = new EventEmitter<MensagemI>();
  adicionar(conteudo: string, usuario: UsuarioI): Observable<any> {
    return this.http.post(`${api}/mensagens`, {
      Conteudo: conteudo,
      Usuario: usuario,
    });
  }
  editar(mensagem: MensagemI) {
    // this.mensagemEditada.emit(mensagem);
  }
  deletar() {}
  atualizar() {}
  listar() {}
}
// private messageSService: Message[] = [];
// messageIsEdit = new EventEmitter<Message>();
// constructor(private http: Http) {}

// getMessages() {
//   return this.http
//     .get("http://localhost:3000/message")
//     .map((resposeRecebida: Response) => {
//       const responseEmJson = resposeRecebida.json();
//       const messageSResponseRecebida = responseEmJson.objsMessageSRecuperados;
//       let transformedCastMassagesModelFrontEnd: Message[] = [];
//       for (let msg of messageSResponseRecebida) {
//         transformedCastMassagesModelFrontEnd.push(
//           new Message(msg.content, "Nayara", msg._id, null)
//         );
//       }
//       this.messageSService = transformedCastMassagesModelFrontEnd;
//       return transformedCastMassagesModelFrontEnd;
//     })
//     .catch((erroRecebido: Response) => Observable.throw(erroRecebido.json()));
// }
// updateMessage(message: Message) {
//   const bodyReq = JSON.stringify(message);
//   const myHeaders = new Headers({ "Content-Type": "application/json" });
//   return this.http
//     .patch("http://localhost:3000/message/" + message.messageId, bodyReq, {
//       headers: myHeaders,
//     })
//     .map((responseRecebida: Response) => responseRecebida.json())
//     .catch((errorRecebido: Response) =>
//       Observable.throw(errorRecebido.json())
//     );
// }
// editMessage(message: Message) {
//   this.messageIsEdit.emit(message);
// }
// deleteMessage(message: Message) {
//   this.messageSService.splice(this.messageSService.indexOf(message), 1);
//   return this.http
//   .delete("http://localhost:3000/message/" + message.messageId)
//   .map((responseRecebida: Response) => responseRecebida.json())
//   .catch((errorRecebido: Response) =>
//     Observable.throw(errorRecebido.json())
//   );
// }

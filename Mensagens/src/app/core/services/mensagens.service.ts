import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UsuarioI } from '../interfaces/usuario.interface';
import { Route, Router } from '@angular/router';
import { MensagemI } from '../interfaces/mensagem.interface';
import { Mensagem } from 'src/app/views/pages/mensagens/mensagens.model';
const api = environment.api;
@Injectable()
export class MensagemService {
  constructor(private http: HttpClient, private router: Router) {}
  token = localStorage.getItem('token');
  mensagemEditada = new EventEmitter<MensagemI>();
  listar(): Observable<any> {
    return this.http.get(`${api}/mensagens`);
  }
  adicionar(conteudo: string): Observable<any> {
    return this.http.post(`${api}/mensagens`, {
      Conteudo: conteudo,
      // Usuario: usuario,
    });
  }
  editar(conteudo: string, id: string): Observable<any> {
    // this.messageSService.splice(this.messageSService.indexOf(message), 1);
    return this.http.put(`${api}/mensagens/editar/${id}`, {
      Conteudo: conteudo
      
    });
  }

  deletar(mensagem: Mensagem): Observable<any> {
    return this.http.delete(`${api}/mensagens/deletar/${mensagem}`, {});
  }
}

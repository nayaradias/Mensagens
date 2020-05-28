import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MensagemI } from '../interfaces/mensagem.interface';
const api = environment.api;
@Injectable()
export class MensagemService {
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');
  mensagemEditada = new EventEmitter<MensagemI>();
  listar(): Observable<any> {
    return this.http.get(`${api}/mensagens`);
  }
  adicionar(conteudo: string): Observable<any> {
    return this.http.post(`${api}/mensagens`, {
      Conteudo: conteudo,
    });
  }
  editar(conteudo: string, id: string): Observable<any> {
    return this.http.put(`${api}/mensagens/editar/${id}`, {
      Conteudo: conteudo,
    });
  }
  upload(formData:FormData){
    return this.http.post(`${api}/usuarios/imagem/`,formData,{});
  }
  deletar(id: string): Observable<any> {
    return this.http.delete(`${api}/mensagens/deletar/${id}`, {});
  }
}

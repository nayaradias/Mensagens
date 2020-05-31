import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UsuarioI } from '../interfaces/usuario.interface';
import { Router } from '@angular/router';
const api = environment.api;
// const apifile = environment.apifile;
@Injectable()
export class AutenticacaoService {
  constructor(private http: HttpClient,private router:Router) {}
  token = localStorage.getItem('token');
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${api}/usuarios/login`, {
      email: email,
      senha: senha,
    });
  }
  cadastrar(usuario: UsuarioI): Observable<any> {
    return this.http.post(`${api}/usuarios`, usuario);
  }
  isLogged(): boolean {
    console.log(this.token);
    return this.token ? true : false;
  }
  usuarioLogado():Observable<any>{
    return this.http.get(`${api}/usuarios/info`);
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Auth/login');
  }
  adicionarFoto(imagem:FormData):Observable<any> {
    return this.http.post(`${api}/usuarios/imagem`,imagem,{
    });
    //return this.http.post(`${apifile}/usuarios/imagem`, imagem)
  }
}

import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { UsuarioI } from 'src/app/core/interfaces/usuario.interface';
import { environment } from '../../../../environments/environment';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})

export class BaseComponent implements OnInit {

  constructor(private autenticacao:AutenticacaoService, private fb:FormBuilder,private router:Router) { }
  usuario:UsuarioI;
  formMensagem:FormGroup;
  env = environment.apifile;
  ngOnInit(): void {
    this.iniciar();
    this.autenticacao.usuarioLogado().subscribe(
      usuario=>{
        console.log("usuarioLogado:",usuario);
        this.usuario = usuario.usuario;
       
      }
    )
  }
  iniciar(){
    this.formMensagem = this.fb.group({
      Conteudo2: this.fb.control('', [Validators.required]),
      
    });
  }
  submit(){
    console.log("submit base:",this.formMensagem.value.Conteudo2);
  }
  sair(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Auth/login');
  }
}

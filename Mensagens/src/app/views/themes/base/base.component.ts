import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { UsuarioI } from 'src/app/core/interfaces/usuario.interface';
import { environment } from '../../../../environments/environment';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})

export class BaseComponent implements OnInit {

  constructor(private autenticacao:AutenticacaoService, private fb:FormBuilder) { }
  usuario:UsuarioI;
  formMensagem:FormGroup;
  env = environment.apifile;
  ngOnInit(): void {
    this.iniciar();
    this.autenticacao.usuarioLogado().subscribe(
      usuario=>{
        this.usuario = usuario.usuario;
        // console.log(usuario);
      }
    )
  }
  iniciar(){
    this.formMensagem = this.fb.group({
      Conteudo: this.fb.control('', [Validators.required]),
    });
  }
  submit(){
    console.log(this.formMensagem.value);
  }

}

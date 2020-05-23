import { Component, OnInit, Input } from '@angular/core';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { UsuarioI } from 'src/app/core/interfaces/usuario.interface';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/core/services/mensagens.service';
import { MensagemI } from 'src/app/core/interfaces/mensagem.interface';
import { Mensagem } from '../../pages/mensagens/mensagens.model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  constructor(
    private autenticacao: AutenticacaoService,
    private mensagemService: MensagemService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  usuario: UsuarioI;
  mensagem: MensagemI;
  formMensagem: FormGroup;
  env = environment.apifile;
  // @Input() messageVar: Mensagem =  new Mensagem("",this.usuario);

  ngOnInit(): void {
    this.iniciar();
    this.autenticacao.usuarioLogado().subscribe((usuario) => {
      console.log('usuarioLogado:', usuario);
      this.usuario = usuario.usuario;
    });
  }
  iniciar() {
    this.formMensagem = this.fb.group({
      Conteudo: this.fb.control('', [Validators.required]),
    });
  }
  submit() {
    this.mensagemService
      .adicionar(this.formMensagem.value.Conteudo, this.usuario)
      .subscribe((res) => {
        console.log('res adicionar mensagem:', res);
      });
  }
  editar(){
    // this.mensagemService.editar(this.messageVar);
  }
  deletar(){
    // this.messageServiceObj.deleteMessage(this.messageVarClasse).subscribe(
    //   dadosSucesso => console.log(dadosSucesso),
    //   dadosErro => console.log(dadosErro)
    // )
  }
  atualizar(){

  }
  listar(){
    
  }
  sair() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Auth/login');
  }
}

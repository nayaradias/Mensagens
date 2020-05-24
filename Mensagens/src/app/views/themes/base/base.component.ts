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
  @Input() messageVar: Mensagem = new Mensagem('', this.usuario);
  mensagensArr: Mensagem[] = [
    new Mensagem('Erro ao listar os posts', this.usuario),
    new Mensagem('Erro ao listar os posts', this.usuario),
    new Mensagem('Erro ao listar os posts', this.usuario),
  ];
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

    this.mensagemService.listar().subscribe(
      (mensagens: Mensagem[]) => {
        this.mensagensArr = mensagens;
        console.log('Listar mensagens:', mensagens);
      },
      (err) => {
        console.log('Listar erro:', err);
      }
    );
  }
  submit() {
    this.mensagemService
      .adicionar(this.formMensagem.value.Conteudo, this.usuario)
      .subscribe((res) => {
        console.log('res adicionar mensagem:', res);
      });
    this.formMensagem.value.Conteudo = '';
  }
  editar() {
    this.mensagemService.editar(this.messageVar).subscribe(
      (mensagem) => {
        console.log('Editar :', mensagem);
      },
      (err) => {
        console.log('Editar :', err);
      }
    );
  }
  deletar() {
    this.mensagemService.deletar(this.messageVar).subscribe(
      (mensagem) => {
        console.log('Deletar :', mensagem);
      },
      (err) => {
        console.log('Deletar :', err);
      }
    );
  }
  sair() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Auth/login');
  }
}

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
    private router: Router
  ) {}
  usuario: UsuarioI;
  mensagem: MensagemI;
  formMensagem: FormGroup;
  env = environment.apifile;
  ngOnInit(): void {
    this.autenticacao.usuarioLogado().subscribe((usuario) => {
      this.usuario = usuario.usuario;
    });
  }
  sair() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Auth/login');
  }
}

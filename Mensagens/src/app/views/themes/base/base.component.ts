import { Component, OnInit, Input } from '@angular/core';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { UsuarioI } from 'src/app/core/interfaces/usuario.interface';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/core/services/mensagens.service';
import { MensagemI } from 'src/app/core/interfaces/mensagem.interface';
import { Mensagem } from '../../pages/mensagens/mensagens.model';
import { element } from 'protractor';

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
  //bg-primaria:#343a40
  //bg-secundaria:#fff
  background: string = '#343a40';
  color: string = '#ffffff';
  usuario: UsuarioI;
  mensagem: MensagemI;
  formMensagem: FormGroup;
  env = environment.apifile;
  tema: any;
  ngOnInit(): void {
    this.tema = localStorage.getItem('tema');
    if (this.tema == '' || this.tema == undefined || this.tema == null) {
      localStorage.setItem(
        'tema',
        JSON.stringify({ background: this.background, color: this.color })
      );
    } else {
      this.background = this.tema.background;
      this.color = this.tema.color;
    }

    this.autenticacao.usuarioLogado().subscribe((usuario) => {
      this.usuario = usuario.usuario;
    });
  }
  SliderValue(event) {
    if (event.target.value == 1) {
      this.background = '#343a40';
      this.color = '#cccccc';
      localStorage.setItem(
        'tema',
        JSON.stringify({ background: this.background, color: this.color })
      );
    } else {
      this.background = '#ffffff';
      this.color = '#343a40';
      localStorage.setItem(
        'tema',
        JSON.stringify({ background: this.background, color: this.color })
      );
    }

    console.log(event.target.value);
  }
  sair() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Auth/login');
  }
}

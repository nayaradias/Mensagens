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
  // background: any = '#343a40';
  // color: any = '#ffffff';
  usuario: UsuarioI;
  mensagem: MensagemI;
  formMensagem: FormGroup;
  env = environment.apifile;
  tema = {
    background: '#343a40',
    color: '#343a40',
  };
  ngOnInit(): void {
    let thema = JSON.parse(localStorage.getItem('tema'));
    if (thema == '' || thema == undefined || thema == null) {
      localStorage.setItem('tema', JSON.stringify(this.tema));
      // this.SliderValue(1);
    } else {
      this.tema.background = thema.background;
      this.tema.color = thema.color;
      // this.SliderValue(2);
    }

    this.autenticacao.usuarioLogado().subscribe((usuario) => {
      this.usuario = usuario.usuario;
    });
  }
  SliderValue(event) {
    let thema:any;
    if (event.target.value == 1) {
      this.tema.background = '#343a40';
      this.tema.color = '#cccccc';
      localStorage.setItem('tema', JSON.stringify(this.tema));
      thema = localStorage.getItem('tema');
    } else {
      this.tema.background = '#ffffff';
      this.tema.color = '#343a40';
      localStorage.setItem('tema', JSON.stringify(this.tema));
      thema = localStorage.getItem('tema');
    }
    console.log(thema);
    return thema;
    // console.log(event.target.value);
  }
  sair() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Auth/login');
  }
}

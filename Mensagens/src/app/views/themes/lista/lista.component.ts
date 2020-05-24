import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MensagemService } from 'src/app/core/services/mensagens.service';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { Router } from '@angular/router';
import { UsuarioI } from 'src/app/core/interfaces/usuario.interface';
import { Mensagem } from '../../pages/mensagens/mensagens.model';
import { MensagemI } from 'src/app/core/interfaces/mensagem.interface';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  constructor(private mensagemService: MensagemService) {}
  mensagens = [];

  ngOnInit(): void {
    this.iniciar();
  }

  iniciar() {
    this.mensagemService.listar().subscribe((res) => {
      console.log(res);
      this.mensagens = res.mensagem;
    });
  }
}

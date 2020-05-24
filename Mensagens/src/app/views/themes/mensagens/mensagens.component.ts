import { Component, OnInit, Input } from '@angular/core';
import { MensagemService } from 'src/app/core/services/mensagens.service';
import { MensagemI } from 'src/app/core/interfaces/mensagem.interface';
import { Mensagem } from '../../pages/mensagens/mensagens.model';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { UsuarioI } from 'src/app/core/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css'],
})
export class MensagensComponent implements OnInit {
  constructor(
    private mensagemService: MensagemService,
    private fb: FormBuilder
  ) {}
  env = environment.apifile;
  //formEditarMensagem: FormGroup;
  @Input() messageVarClasse;
  ngOnInit(): void {
    // this.usuario;
  }
  editarService(mensagem) {
    this.mensagemService
      .editar('CONTEUDO NEW', mensagem._id)
      .subscribe((res) => {
        console.log(res);
      });
    console.log(mensagem);
  }
  // submitNewMessage() {
  //   this.formEditarMensagem = this.fb.group({
  //     NewConteudo: this.fb.control('', [Validators.required]),
  //   });
  // }
  deletarService() {
    debugger;
    this.mensagemService.deletar(this.messageVarClasse).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}

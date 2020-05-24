import { Component, OnInit, Input } from '@angular/core';
import { MensagemService } from 'src/app/core/services/mensagens.service';
import { MensagemI } from 'src/app/core/interfaces/mensagem.interface';
import { Mensagem } from '../../pages/mensagens/mensagens.model';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { UsuarioI } from 'src/app/core/interfaces/usuario.interface';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css'],
})
export class MensagensComponent implements OnInit {
  constructor(private mensagemService: MensagemService) {}

  @Input() messageVarClasse: Mensagem = new Mensagem('', null, null, '');
  ngOnInit(): void {
    // this.usuario;
  }
  editarService() {
    // this.mensagemService.editMessage(this.messageVarClasse);
    this.mensagemService.editar(this.messageVarClasse).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
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

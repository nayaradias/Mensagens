import { Component, OnInit, Input } from '@angular/core';
import { MensagemService } from 'src/app/core/services/mensagens.service';
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
  @Input() messageVarClasse;
  ngOnInit(): void {}
  editarService(mensagem) {
    this.mensagemService
      .editar('CONTEUDO NEW', mensagem._id)
      .subscribe((res) => {
        console.log(res);
      });
    console.log(mensagem);
  }
  deletarService(mensagem) {
    debugger;
    this.mensagemService
      .deletar(mensagem._id)
      .subscribe((res) => console.log(res));
  }
}

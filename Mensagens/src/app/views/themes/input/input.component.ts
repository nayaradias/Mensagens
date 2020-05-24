import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioI } from 'src/app/core/interfaces/usuario.interface';
import { MensagemService } from 'src/app/core/services/mensagens.service';
import { Mensagem } from '../../pages/mensagens/mensagens.model';
import { MensagemI } from 'src/app/core/interfaces/mensagem.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  constructor(
    private mensagemService: MensagemService,
    private fb: FormBuilder
  ) {}
  formMensagem: FormGroup;
  usuario: UsuarioI;
  messageLoad: MensagemI;
  ngOnInit(): void {
    this.formMensagem = this.fb.group({
      Conteudo: this.fb.control('', [Validators.required]),
    });

    this.mensagemService.mensagemEditada.subscribe((message: MensagemI) => {
      this.messageLoad = message;
      console.log(this.messageLoad);
    });
  }
  submit() {
    this.mensagemService.adicionar(this.formMensagem.value.Conteudo).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.formMensagem = this.fb.group({
      Conteudo: this.fb.control('', [Validators.required]),
    });
  }
  
}

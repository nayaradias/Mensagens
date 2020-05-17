import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formCadastro: FormGroup;
  constructor(
    private fb: FormBuilder,
    private autenticacao: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.initFormulario();
  }
  initFormulario() {
    this.formCadastro = this.fb.group({
      Nome: this.fb.control('', [Validators.required]),
      Sobrenome: this.fb.control('', [Validators.required]),
      Email: this.fb.control('', [Validators.required]),
      Senha: this.fb.control('', [Validators.required]),
    });
  }
  submit() {
    this.autenticacao.cadastrar(
      this.formCadastro.value
      ).subscribe(
      res=>{
        console.log(res);
      }
    )
    console.log(this.formCadastro.value);
  }
}

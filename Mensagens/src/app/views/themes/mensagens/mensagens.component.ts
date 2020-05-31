import { Component, OnInit, Input } from '@angular/core';
import { MensagemService } from 'src/app/core/services/mensagens.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { UsuarioI } from 'src/app/core/interfaces/usuario.interface';
@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css'],
})
export class MensagensComponent implements OnInit {
  constructor(
    private mensagemService: MensagemService,
    private autenticacao: AutenticacaoService,
    private fb: FormBuilder
  ) {}
  env = environment.apifile;
  usuario: UsuarioI;
  @Input() messageVarClasse;
  show: boolean = true;
  ngOnInit(): void {
    this.autenticacao.usuarioLogado().subscribe((usuario) => {
      this.usuario = usuario.usuario;
      if (this.messageVarClasse.Usuario.Email == this.usuario.Email)
        this.show = true;
      else this.show = false;

      console.log('show:',this.show);
    });
  }
  editarService(mensagem) {
    let novaMensagem = '';
    Swal.fire({
      title: 'Digite a nova mensagem',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        novaMensagem = result.value;
        console.log('novaMensagem:', novaMensagem);
        this.mensagemService
          .editar(novaMensagem, mensagem._id)
          .subscribe((res) => {
            console.log(res);
            window.location.reload();
          });
      }
    });

    console.log(mensagem);
  }
  deletarService(mensagem) {
    debugger;
    this.mensagemService.deletar(mensagem._id).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }
}

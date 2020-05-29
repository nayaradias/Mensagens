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
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  constructor(
    private autenticacao: AutenticacaoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  //bg-primaria:#343a40
  //bg-secundaria:#fff
  // background: any = '#343a40';
  // color: any = '#ffffff';
  usuario: UsuarioI;
  mensagem: MensagemI;
  formMensagem: FormGroup;
  uploadForm: FormGroup;
  env = environment.apifile;
  api = environment.api;
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
      console.log('Usuario', this.usuario);
    });
    this.uploadForm = this.formBuilder.group({
      profile: [''],
    });
  }
  SliderValue(event) {
    let thema: any;
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
  // upload() {
  //   // const { value: file } = await Swal.fire({
  //   //   title: 'Selecione uma imagem',
  //   //   input: 'file',
  //   //   inputAttributes: {
  //   //     accept: 'image/*',
  //   //     'aria-label': 'Upload',
  //   //   },

  //   // });

  //   // if (file) {
  //   //   const reader = new FileReader();
  //   //   reader.onload = (e) => {
  //   //     Swal.fire({
  //   //       title: 'Imagem adicionada com sucesso',
  //   //       imageUrl: e.target.result,
  //   //       imageAlt: 'Imagem',
  //   //     });
  //   //   };
  //   //   reader.readAsDataURL(file);
  //   //   console.log('file:',file);
  //   //   this.autenticacao.adicionarFoto(file).subscribe(
  //   //     (res) => {console.log(res);window.location.reload();},
  //   //     (err) => console.log(err)
  //   //   );
  //   // }

  //   Swal.fire({
  //     title: '<h6>Adicionar Foto de Perfil</h6>',
  //     type: 'info',
  //     html:
  //       '<div class="container text-center mx-auto" style="width: 500px;"></br>' +
  //       '<form [formGroup]="uploadForm" (ngSubmit)="onSubmit()">' +
  //       '<div class="form-group">' +
  //       ' <input type="file" class=" btn btn-info" name="profile" (change)="onFileSelect($event)"/>' +
  //       '</div>' +
  //       '<div>' +
  //       '<button type="submit" class="btn btn-info">Fazer Upload</button>' +
  //       '</div>' +
  //       '</form>' +
  //       '</div>',
  //     showCloseButton: true,
  //     showConfirmButton: false,
  //   });
  // }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }
  onSubmit() {
    var formData: FormData = new FormData();
    formData.append('imagem', this.uploadForm.get('profile').value);
    this.autenticacao.adicionarFoto(formData).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => console.log(err)
    );
  }
  sair() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Auth/login');
  }
}

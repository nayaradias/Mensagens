import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoService } from '../../../../core/services/autenticacao.service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin:FormGroup;
  constructor(private fb:FormBuilder, private autenticacao:AutenticacaoService,private router:Router) { }

  ngOnInit(): void {
    this.initFormulario();
  }
  initFormulario(){
    this.formLogin = this.fb.group({
        email: this.fb.control('',[Validators.required]),
        senha:this.fb.control('',[Validators.required]),
    })
  }
  submit(){
    this.autenticacao.login(this.formLogin.value.email,this.formLogin.value.senha).subscribe(
      res=>{
        // console.log(res);
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/Mensagens');
      }
    )
    // console.log(this.formLogin.value);
  }
  onClickCadastrar() {
    this.router.navigateByUrl('Auth/registro');
  }
}

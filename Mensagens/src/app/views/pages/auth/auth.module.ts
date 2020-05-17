import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { Route } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from 'src/app/core/utils/intercept.service';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [RegistroComponent, LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[InterceptorService]
})
export class AuthModule {}

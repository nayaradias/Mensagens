import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoService } from '../app/core/services/autenticacao.service';
import { InterceptorService } from './core/utils/intercept.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DasboardComponent } from './views/pages/dasboard/dasboard.component';
@NgModule({
  declarations: [AppComponent, DasboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AutenticacaoService,{
    provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}

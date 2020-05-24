import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoService } from '../app/core/services/autenticacao.service';
import { InterceptorService } from './core/utils/intercept.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemesModule } from './views/themes/themes.module';
import { MensagemService } from './core/services/mensagens.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemesModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    MensagemService,
    AutenticacaoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

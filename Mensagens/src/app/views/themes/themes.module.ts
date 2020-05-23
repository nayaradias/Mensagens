import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BaseComponent } from './base/base.component';
import { InterceptorService } from 'src/app/core/utils/intercept.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ BaseComponent],
  imports: [CommonModule,FormsModule, ReactiveFormsModule,],
  exports: [BaseComponent,  CommonModule,
    FormsModule,
    ReactiveFormsModule],
    //providers: [InterceptorService],
})
export class ThemesModule {}

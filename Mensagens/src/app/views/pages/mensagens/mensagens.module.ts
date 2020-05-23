import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from 'src/app/core/utils/intercept.service';
import { ListaMensagensComponent } from './lista-mensagens/lista-mensagens.component';
import { PostsComponent } from './posts/posts.component';
import { MensagensComponent } from './mensagens.component';
const routes: Routes = [
  {
    path: '',
    component: MensagensComponent,
    children: [
      {
        path: '',
        component: ListaMensagensComponent,
      },
      {
        path: '',
        component: PostsComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [MensagensComponent, ListaMensagensComponent, PostsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [InterceptorService],
  exports: [MensagensComponent]
})
export class MensagensModule {}

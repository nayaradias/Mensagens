import { Component, OnInit } from '@angular/core';
import { MensagemService } from 'src/app/core/services/mensagens.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  constructor(private mensagemService: MensagemService) {}
  mensagens = [];

  ngOnInit(): void {
    this.iniciar();
  }

  iniciar() {
    this.mensagemService.listar().subscribe((res) => {
      console.log(res);
      this.mensagens = res.mensagem;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { ProgramacaoService } from 'src/app/services/programacao.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  loading = false;
  arrProgramacao: any = [];
  arrUsuarios: any = [];

  constructor(private Programacao: ProgramacaoService, private notify: SnotifyService) { }

  ngOnInit() {
    this.loading = true;
    this.Programacao.get().subscribe(
      result => {
        this.loading = false;
        this.arrProgramacao = result;
      },
      error => {
        this.loading = false;
        this.notify.error('Erro ao retornar a programação', {timeout: 3000, showProgressBar: false });
      }
    );
  }

  loadInscritos(programacao) {
    this.loading = true;
    this.Programacao.getList(programacao).subscribe(
      result => {
        this.loading = false;
        this.arrUsuarios = result;
      },
      error => {
        this.loading = false;
        this.notify.error('Erro ao retornar a lista de inscritos', {timeout: 3000, showProgressBar: false });
      }
    );
  }

}

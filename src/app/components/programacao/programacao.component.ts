import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProgramacaoService } from 'src/app/services/programacao.service';
import { SnotifyService } from 'ng-snotify';
import { UsoService } from 'src/app/services/uso.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-programacao-edit-modal',
  template: `
  <form>
  <div class="modal-header">
    <h4 class="modal-title">Editar programação</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
    <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div class="form-row">
      <div class="form-group col-md-12">
        <input type="text" class="form-control" [(ngModel)]="titulo" [ngModelOptions]="{standalone: true}" required />
      </div>
      <div class="form-group col-md-2">
        <input type="text" class="form-control" [(ngModel)]="dia" [ngModelOptions]="{standalone: true}" required />
      </div>
      <div class="form-group col-md-2">
        <input type="text" class="form-control" [(ngModel)]="hora_inicio" [ngModelOptions]="{standalone: true}" required />
      </div>
      <div class="form-group col-md-2">
        <input type="text" class="form-control" [(ngModel)]="hora_fim" [ngModelOptions]="{standalone: true}" required />
      </div>
      <div class="form-group col-md-6">
        <input type="text" class="form-control" [(ngModel)]="local" [ngModelOptions]="{standalone: true}" required />
      </div>
      <div class="form-group col-md-3">
        <select id="inputTipo" class="form-control" [(ngModel)]="tipo" [ngModelOptions]="{standalone: true}">
          <option selected value="0">Selecione o tipo</option>
          <option selected value="Oficina">Oficina</option>
          <option selected value="Palestra">Palestra</option>
        </select>
      </div>
      <div class="form-group col-md-2">
        <input type="text" class="form-control" [(ngModel)]="vagas" [ngModelOptions]="{standalone: true}" />
      </div>
      <div class="form-group col-md-7">
        <select id="inputPalestrantes" class="form-control" [(ngModel)]="palestrante" [ngModelOptions]="{standalone: true}">
          <option selected value="0">Selecione o palestrante</option>
          <option *ngFor="let palestrante of arrPalestrantes" [value]="palestrante.id">{{palestrante.nome}}</option>
        </select>
      </div>
      <div class="custom-file">
        <input type="file" (change)="fileChange($event)" [(ngModel)]="documento"
        [ngModelOptions]="{standalone: true}" class="custom-file-input" id="documentoFile">
        <label class="custom-file-label" for="documentoFile"> {{ textDocumento }}</label>
        <div class="invalid-feedback">Arquivo inválido</div>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-light" (click)="activeModal.dismiss('cancel click')">Cancelar</button>
    <button type="button" (click)="edit(titulo, dia, hora_inicio, hora_fim, local, tipo, vagas, palestrante, id)"
     class="btn btn-danger" ngbAutofocus>Editar</button>
  </div>
</form>

  `
})
export class ModalProgramacaoEditComponent {
  @Input() titulo;
  @Input() dia;
  @Input() hora_inicio;
  @Input() hora_fim;
  @Input() local;
  @Input() palestrante;
  @Input() tipo;
  @Input() vagas;
  @Input() id;
  @Input() arrPalestrantes;
  textDocumento = 'Selecione o arquivo com conteúdo';
  fileSelected: any;
  documento: any;

  constructor(public activeModal: NgbActiveModal) {}

  fileChange(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileSelected = file;
      this.textDocumento = file.name;
    }
  }

  edit(titulo, dia, hora_inicio, hora_fim, local, tipo, vagas, palestrante, id) {

    const input = new FormData();
    if (this.fileSelected) {
      input.append('documento', this.fileSelected, this.fileSelected.name);
    }

    input.append('id', id);
    input.append('dia', dia);
    input.append('hora_fim', hora_fim);
    input.append('hora_inicio', hora_inicio);
    input.append('local', local);
    input.append('palestrante', palestrante);
    input.append('tipo', tipo);
    input.append('titulo', titulo);
    input.append('vagas', vagas);

    this.activeModal.close(input);
  }
}

@Component({
  selector: 'app-programacao-votacao-modal',
  template: `
  <form>
  <div class="modal-header">
    <h4 class="modal-title">Conclusão da Oficina</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
    <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div class="form-group col-md-12">
      <textarea rows="5" class="form-control" [(ngModel)]="conclusao" [ngModelOptions]="{standalone: true}"></textarea>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-light" (click)="activeModal.dismiss('cancel click')">Cancelar</button>
    <button type="button" class="btn btn-light" *ngIf="votacao" (click)="desabilitar()">Desabilitar Votação</button>
    <button type="button" (click)="finalizar(conclusao)" class="btn btn-danger" ngbAutofocus>Finalizar</button>
  </div>
</form>

  `
})
export class ModalProgramacaoVotacaoComponent {
  @Input() conclusao;
  @Input() votacao;
  @Input() id;

  constructor(public activeModal: NgbActiveModal) {}

  finalizar(conclusao) {
    const data = {
      id: this.id,
      conclusao: conclusao,
      acao: 'finalizar'
    };
    this.activeModal.close(data);
  }

  desabilitar() {
    const data = {
      id: this.id,
      votacao: this.votacao,
      acao: 'desabilitar'
    };
    this.activeModal.close(data);
  }
}

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./programacao.component.css']
})
export class ProgramacaoComponent implements OnInit {

  loading = false;
  arrPalestrantes: any;
  arrItems: any = [];
  programacaoForm: any;
  id: any;
  textDocumento = 'Selecione o arquivo com conteúdo';
  fileSelected: any;

  constructor(private Programacao: ProgramacaoService, private notify: SnotifyService,
    private Uso: UsoService, private modalService: NgbModal) {
    this.getForm();
  }

  getForm() {
    this.programacaoForm = new FormGroup({
      titulo: new FormControl(''),
      dia: new FormControl(''),
      hora_inicio: new FormControl(''),
      hora_fim: new FormControl(''),
      local: new FormControl(''),
      vagas: new FormControl(''),
      selectedTipo: new FormControl(0),
      selectedPalestrante: new FormControl(0),
      documento: new FormControl('')
    });
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileSelected = file;
      this.textDocumento = file.name;
    }
  }

  ngOnInit() {
    this.loading = true;
    this.Programacao.get().subscribe(
      result => {
        this.arrItems = result;
      },
      error => {
        this.notify.error('Erro ao retornar a programação', {timeout: 3000, showProgressBar: false });
      }
    );

    this.Uso.get().subscribe(
      result => {
        this.loading = false;
        this.arrPalestrantes = result;
      },
      error => {
        this.loading = false;
        this.notify.error('Erro ao retornar os palestrantes', {timeout: 3000, showProgressBar: false });
      }
    );
  }

  checkButton() {
    return this.programacaoForm.value.titulo && this.programacaoForm.value.dia
    && this.programacaoForm.value.hora_inicio && this.programacaoForm.value.hora_fim
    && this.programacaoForm.value.local
    && !(this.programacaoForm.value.selectedTipo === 0) && !(this.programacaoForm.value.selectedPalestrante === 0);
  }

  openRemove(content, id) {
    this.id = id;
    this.modalService.open(content);
  }

  openEdit(id, titulo, dia, hora_inicio, hora_fim, local, tipo, vagas, palestrante) {
    const modalRef = this.modalService.open(ModalProgramacaoEditComponent, { size: 'lg' });
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.dia = dia;
    modalRef.componentInstance.hora_inicio = hora_inicio;
    modalRef.componentInstance.hora_fim = hora_fim;
    modalRef.componentInstance.local = local;
    modalRef.componentInstance.tipo = tipo;
    modalRef.componentInstance.vagas = vagas;
    modalRef.componentInstance.palestrante = palestrante;
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.arrPalestrantes = this.arrPalestrantes;

    modalRef.result.then((result) => {
      this.edit(result);
    }).catch((error) => {
    });
  }

  openDocumento(file) {
    window.open(`http://localhost:8000/files/${file}`, '_blank');
  }

  onSubmit() {
    this.loading = true;
    const input = new FormData();
    if (this.fileSelected) {
      input.append('documento', this.fileSelected, this.fileSelected.name);
    }
    input.append('dia', this.programacaoForm.value.dia);
    input.append('hora_fim', this.programacaoForm.value.hora_fim);
    input.append('hora_inicio', this.programacaoForm.value.hora_inicio);
    input.append('local', this.programacaoForm.value.local);
    input.append('selectedPalestrante', this.programacaoForm.value.selectedPalestrante);
    input.append('selectedTipo', this.programacaoForm.value.selectedTipo);
    input.append('titulo', this.programacaoForm.value.titulo);
    input.append('vagas', this.programacaoForm.value.vagas);

    this.Programacao.save(input).subscribe(
      result => {
        this.loading = false;
        this.textDocumento = 'Selecione o arquivo com conteúdo';
        this.getForm();
        this.arrItems = result['data'];
        this.notify.success(result['message'], {timeout: 2000, showProgressBar: false });
      },
      error => {
        this.loading = false;
        this.textDocumento = 'Selecione o arquivo com conteúdo';
        this.getForm();
        this.notify.error(error.error, {timeout: 3000, showProgressBar: false });
      }
    );
  }

  remove() {
    this.loading = true;
    this.Programacao.remove(this.id).subscribe(
      result => {
        this.loading = false;
        this.arrItems = result['data'];
        this.modalService.dismissAll();
        this.notify.success(result['message'], {timeout: 2000, showProgressBar: false });
      },
      error => {
        this.loading = false;
        this.modalService.dismissAll();
        this.notify.error(error.error, {timeout: 3000, showProgressBar: false });
      }
    );
  }

  edit(data) {
    this.loading = true;
    this.Programacao.edit(data).subscribe(
      result => {
        this.loading = false;
        this.arrItems = result['data'];
        this.modalService.dismissAll();
        this.notify.success(result['message'], {timeout: 2000, showProgressBar: false });
      },
      error => {
        this.loading = false;
        this.modalService.dismissAll();
        this.notify.error(error.error, {timeout: 3000, showProgressBar: false });
      }
    );
  }

  openVotacao(id, votacao, conclusao) {
    const modalRef = this.modalService.open(ModalProgramacaoVotacaoComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.votacao = votacao;
    modalRef.componentInstance.conclusao = conclusao;

    modalRef.result.then((result) => {
      if (result.acao === 'finalizar') {
        this.finalizar(result);
      } else {
        this.desabilitar(result);
      }
    }).catch((error) => {
    });
  }

  finalizar(data) {
    this.loading = true;
    this.Programacao.finalizar(data).subscribe(
      result => {
        this.loading = false;
        this.arrItems = result['data'];
        this.modalService.dismissAll();
        this.notify.success(result['message'], {timeout: 2000, showProgressBar: false });
      },
      error => {
        this.loading = false;
        this.modalService.dismissAll();
        this.notify.error(error.error, {timeout: 3000, showProgressBar: false });
      }
    );
  }

  desabilitar(data) {
    this.loading = true;
    this.Programacao.desabilitar(data).subscribe(
      result => {
        this.loading = false;
        this.arrItems = result['data'];
        this.modalService.dismissAll();
        this.notify.success(result['message'], {timeout: 2000, showProgressBar: false });
      },
      error => {
        this.loading = false;
        this.modalService.dismissAll();
        this.notify.error(error.error, {timeout: 3000, showProgressBar: false });
      }
    );
  }
}

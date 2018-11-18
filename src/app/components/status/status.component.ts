import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { StatusService } from 'src/app/services/status.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramacaoService } from 'src/app/services/programacao.service';

@Component({
  selector: 'app-status-edit-modal',
  template: `
  <form>
  <div class="modal-header">
    <h4 class="modal-title">Responder</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
    <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div class="form-row">
      <div class="form-group col-md-12">
        <textarea class="form-control" [(ngModel)]="resposta" [ngModelOptions]="{standalone: true}"></textarea>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-light" (click)="activeModal.dismiss('cancel click')">Cancelar</button>
    <button type="button" (click)="edit(resposta, id_pergunta, id_programacao)"
     class="btn btn-danger" ngbAutofocus>Editar</button>
  </div>
</form>

  `
})

export class ModalStatusEditComponent {
  @Input() id_pergunta;
  @Input() id_programacao;

  constructor(public activeModal: NgbActiveModal) {}

  edit(resposta, id_pergunta, id_programacao) {
    const userObject = JSON.parse(localStorage.getItem('user'));

    const data = {
      resposta: resposta,
      id_pergunta: id_pergunta,
      id_user: userObject.id,
      id_programacao: id_programacao
    };
    this.activeModal.close(data);
  }
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statusForm = new FormGroup({
    nome: new FormControl(''),
    porcentagem: new FormControl('')
  });
  loading = false;
  arrItems: any = [];
  arrProgramacao: any = [];
  id: any;

  constructor(private notify: SnotifyService, private Status: StatusService, private modalService: NgbModal,
    private Programacao: ProgramacaoService) { }

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

  onSubmit() {
    this.loading = true;
    this.Status.save(this.statusForm.value).subscribe(
      result => {
        this.loading = false;
        this.statusForm.reset();
        this.arrItems = result['data'];
        this.notify.success(result['message'], {timeout: 2000, showProgressBar: false });
      },
      error => {
        this.loading = false;
        this.statusForm.reset();
        this.notify.error(error.error, {timeout: 3000, showProgressBar: false });
      }
    );
  }

  loadPerguntas(programacao) {
    this.Status.getPerguntas(programacao).subscribe(
      result => {
        this.loading = false;
        this.statusForm.reset();
        this.arrItems = result;
      },
      error => {
        this.loading = false;
        this.statusForm.reset();
        this.notify.error(error.error, {timeout: 3000, showProgressBar: false });
      }
    );
  }

  responder(id_pergunta, id_programacao) {
    const modalRef = this.modalService.open(ModalStatusEditComponent);
    modalRef.componentInstance.id_pergunta = id_pergunta;
    modalRef.componentInstance.id_programacao = id_programacao;

    modalRef.result.then((result) => {
      this.sendResposta(result);
    }).catch((error) => {
    });
  }

  sendResposta(data) {
    this.loading = true;
    this.Status.save(data).subscribe(
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

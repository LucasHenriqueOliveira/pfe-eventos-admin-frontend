import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  loading = false;
  arrUsuarios = [];

  constructor(private notify: SnotifyService, private User: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.User.get().subscribe(
      result => {
        this.loading = false;
        this.arrUsuarios = result;
      },
      error => {
        this.loading = false;
        this.notify.error('Erro ao retornar os usuários', {timeout: 3000, showProgressBar: false });
      }
    );
  }

}

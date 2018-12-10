import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  public form = {
    email: null
  };

  public error = null;
  loading = false;

  constructor(private User: UserService) { }

  onSubmit() {
    this.loading = true;
    this.User.certificado(this.form).subscribe(
      data => {
        this.loading = false;
        this.error = '';
        window.open('https://pfe-eventos.herokuapp.com/files/certificados/' + data['data'], '_blank');
      },
      error => {
        this.loading = false;
        this.error = error.error.error;
      }
    );
  }

  ngOnInit() {
  }

}

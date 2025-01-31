import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error: any = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };

  constructor(
    private route: ActivatedRoute,
    private User: UserService,
    private router: Router,
    private Notify: SnotifyService
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
    });
  }

  onSubmit() {
    this.User.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    const _router = this.router;
    this.Notify.confirm('Done!, Now login with new Password', {
      buttons: [
        {text: 'Okay',
        action: toster => {
           _router.navigateByUrl('/login'),
           this.Notify.remove(toster.id);
          }
      },
      ]
    });
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}

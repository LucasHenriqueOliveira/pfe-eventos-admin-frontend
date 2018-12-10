import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ProgramacaoComponent,
  ModalProgramacaoEditComponent,
  ModalProgramacaoVotacaoComponent } from './components/programacao/programacao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgramacaoService } from './services/programacao.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { ListaComponent } from './components/lista/lista.component';
import { UsoComponent, ModalUsoEditComponent } from './components/uso/uso.component';
import { StatusComponent, ModalStatusEditComponent } from './components/status/status.component';
import { StatusService } from './services/status.service';
import { UsoService } from './services/uso.service';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DashboardService } from './services/dashboard.service';
import { CertificadoComponent } from './components/certificado/certificado.component';
registerLocaleData(ptBr);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    ProgramacaoComponent,
    DashboardComponent,
    ListaComponent,
    UsoComponent,
    StatusComponent,
    ModalProgramacaoEditComponent,
    ModalUsoEditComponent,
    ModalStatusEditComponent,
    ModalProgramacaoVotacaoComponent,
    UsuariosComponent,
    CertificadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule
  ],
  providers: [
    UserService,
    TokenService,
    AuthService,
    BeforeLoginService,
    AfterLoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    ProgramacaoService,
    StatusService,
    UsoService,
    DashboardService,
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalProgramacaoEditComponent,
    ModalUsoEditComponent,
    ModalStatusEditComponent,
    ModalProgramacaoVotacaoComponent
  ]
})
export class AppModule { }

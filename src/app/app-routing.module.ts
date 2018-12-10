import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { ProgramacaoComponent } from './components/programacao/programacao.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaComponent } from './components/lista/lista.component';
import { StatusComponent } from './components/status/status.component';
import { UsoComponent } from './components/uso/uso.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CertificadoComponent } from './components/certificado/certificado.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    canActivate: [BeforeLoginService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'programacao',
    component: ProgramacaoComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'lista',
    component: ListaComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'uso',
    component: UsoComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'status',
    component: StatusComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'request-password-reset',
    component: RequestResetComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'certificado',
    component: CertificadoComponent,
    canActivate: [BeforeLoginService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

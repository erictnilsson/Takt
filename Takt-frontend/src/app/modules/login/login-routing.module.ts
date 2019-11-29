import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'authenticate_me',
    component: AuthenticateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/login/login.module#LoginModule'
    // not guarded by AuthGuard
  },
  {
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard] // guarded by AuthGuard
  },
  {
    path: 'room',
    loadChildren: './modules/room/room.module#RoomModule',
    canActivate: [AuthGuard] // guarded by AuthGuard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

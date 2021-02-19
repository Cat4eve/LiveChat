import { UserComponent } from './user/user.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { LoginGuardGuard } from './Auth/login-guard.guard';
import { RegComponent } from './reg/reg.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegComponent },
  { path: 'cabinet', component: CabinetComponent, canActivate: [LoginGuardGuard] },
  { path: 'chat', component: UserComponent, canActivate: [LoginGuardGuard]},
  { path: '', redirectTo: 'cabinet', pathMatch: 'full' },
  { path: '**', redirectTo: 'cabinet', pathMatch: 'full' }
];

//localhost:4200/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

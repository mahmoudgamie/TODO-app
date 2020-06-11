import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { PrivilegeGuardService } from 'src/services/privilege-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create',
    component: CreateOrEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit/:id',
    component: CreateOrEditComponent,
    canActivate: [AuthGuardService, PrivilegeGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

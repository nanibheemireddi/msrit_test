import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';


 


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
	{ path: '', redirectTo: 'login',pathMatch:'full' },
	{ path: 'register', component: RegisterComponent },
	{ path: 'dashboard', component: DashboardComponent },
];
// export const appRoutes


export default appRoutes;
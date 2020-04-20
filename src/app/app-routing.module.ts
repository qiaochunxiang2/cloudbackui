import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full', data: {reuse: false, track: false}},
  {path: 'login', component: LoginComponent},
  {path: 'index', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule), data: {reuse: false, track: false}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

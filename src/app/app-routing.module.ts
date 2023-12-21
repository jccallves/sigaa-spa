import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./component/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule) },
  { path: 'app', loadChildren: () => import('./component/app/app.module').then(m => m.AppModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

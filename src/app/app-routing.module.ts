import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard.service';
import { Roles } from './shared/enum/roles';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./component/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule) },
  {
    path: 'app', loadChildren: () => import('./component/app/app.module').then(m => m.AppModule),
    canActivate: [AuthGuard],
    data: {
      roles: [Roles.USER,Roles.USER_EDIT]
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

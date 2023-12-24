import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from '../template/sidenav/sidenav.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.service';
import { Roles } from 'src/app/shared/enum/roles';
import { BodyComponent } from '../template/body/body.component';


const routes: Routes = [
  { path: '', component: SidenavComponent ,
    children: [
      {
        path: 'cadastro', loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule),
        canActivate: [AuthGuard],
        data: {
          roles: [Roles.ADMIN, Roles.USER_EDIT]
        }
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

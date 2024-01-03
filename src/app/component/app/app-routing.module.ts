import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from '../template/sidenav/sidenav.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.service';
import { Roles } from 'src/app/shared/enum/roles';


const routes: Routes = [
  { path: '', component: SidenavComponent ,
    children: [
      {
        path: 'cadastro', loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule),
        canActivate: [AuthGuard],
        data: {
          roles: [Roles.ADMIN, Roles.USER_EDIT]
        }
      },
      {
        path: 'professor', loadChildren: () => import('./professor/professor.module').then(m => m.ProfessorModule),
        canActivate: [AuthGuard],
        data: {
          roles: [Roles.ADMIN, Roles.GESTAO, Roles.USER_EDIT]
        }
      },
      {
        path: 'disciplina', loadChildren: () => import('./disciplina/disciplina.module').then(m => m.DisciplinaModule),
        canActivate: [AuthGuard],
        data: {
          roles: [Roles.ADMIN, Roles.GESTAO, Roles.USER_EDIT]
        }
      },
      {
        path: 'tipoAvaliacao', loadChildren: () => import('./tipo-avaliacao/tipo-avaliacao.module').then(m => m.TipoAvaliacaoModule),
        canActivate: [AuthGuard],
        data: {
          roles: [Roles.ADMIN, Roles.GESTAO]
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

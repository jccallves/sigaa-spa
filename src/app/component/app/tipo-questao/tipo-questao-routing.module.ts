import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoQuestaoComponent } from './tipo-questao/tipo-questao.component';

const routes: Routes = [
  {
    path: '', component: TipoQuestaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoQuestaoRoutingModule { }

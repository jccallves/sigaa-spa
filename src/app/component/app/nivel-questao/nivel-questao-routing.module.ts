import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelQuestaoComponent } from './nivel-questao/nivel-questao.component';

const routes: Routes = [
  {
    path: '', component: NivelQuestaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NivelQuestaoRoutingModule { }

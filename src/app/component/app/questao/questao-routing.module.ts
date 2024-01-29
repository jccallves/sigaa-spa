import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestaoComponent } from './questao/questao.component';

const routes: Routes = [
  {
    path: '', component: QuestaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestaoRoutingModule { }

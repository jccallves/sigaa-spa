import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoAvaliacaoComponent } from './tipo-avaliacao/tipo-avaliacao.component';

const routes: Routes = [
  {
    path: '', component: TipoAvaliacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoAvaliacaoRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssuntoComponent } from './assunto/assunto.component';

const routes: Routes = [
  {
    path: '', component: AssuntoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssuntoRoutingModule { }

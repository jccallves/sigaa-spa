import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplinaRoutingModule } from './disciplina-routing.module';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DisciplinaComponent
  ],
  imports: [
    CommonModule,
    DisciplinaRoutingModule,
    SharedModule
  ]
})
export class DisciplinaModule { }

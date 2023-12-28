import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorComponent } from './professor/professor.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfessorComponent
  ],
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    SharedModule
  ]
})
export class ProfessorModule { }

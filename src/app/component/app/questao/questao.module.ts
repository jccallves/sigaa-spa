import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestaoRoutingModule } from './questao-routing.module';
import { QuestaoComponent } from './questao/questao.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    QuestaoComponent
  ],
  imports: [
    CommonModule,
    QuestaoRoutingModule,
    SharedModule
  ]
})
export class QuestaoModule { }

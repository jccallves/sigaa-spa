import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NivelQuestaoRoutingModule } from './nivel-questao-routing.module';
import { NivelQuestaoComponent } from './nivel-questao/nivel-questao.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NivelQuestaoComponent
  ],
  imports: [
    CommonModule,
    NivelQuestaoRoutingModule,
    SharedModule
  ]
})
export class NivelQuestaoModule { }

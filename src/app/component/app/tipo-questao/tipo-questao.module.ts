import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoQuestaoRoutingModule } from './tipo-questao-routing.module';
import { TipoQuestaoComponent } from './tipo-questao/tipo-questao.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TipoQuestaoComponent
  ],
  imports: [
    CommonModule,
    TipoQuestaoRoutingModule,
    SharedModule
  ]
})
export class TipoQuestaoModule { }

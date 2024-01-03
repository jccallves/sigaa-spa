import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoAvaliacaoRoutingModule } from './tipo-avaliacao-routing.module';
import { TipoAvaliacaoComponent } from './tipo-avaliacao/tipo-avaliacao.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TipoAvaliacaoComponent
  ],
  imports: [
    CommonModule,
    TipoAvaliacaoRoutingModule,
    SharedModule
  ]
})
export class TipoAvaliacaoModule { }

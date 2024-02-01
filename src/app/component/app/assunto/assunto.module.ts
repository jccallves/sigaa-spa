import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssuntoRoutingModule } from './assunto-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssuntoComponent } from './assunto/assunto.component';


@NgModule({
  declarations: [
    AssuntoComponent
  ],
  imports: [
    CommonModule,
    AssuntoRoutingModule,
    SharedModule
  ]
})
export class AssuntoModule { }

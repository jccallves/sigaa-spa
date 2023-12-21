import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    HttpClientModule,
  ],
  exports: [
    MaterialModule,
    CoreModule,
  ]
})
export class SharedModule { }

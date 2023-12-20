import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { SidenavComponent } from '../template/sidenav/sidenav.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class AppModule { }

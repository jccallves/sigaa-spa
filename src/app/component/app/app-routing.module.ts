import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from '../template/sidenav/sidenav.component';


const routes: Routes = [
  { path: '', component: SidenavComponent ,
    children: [
      {

      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

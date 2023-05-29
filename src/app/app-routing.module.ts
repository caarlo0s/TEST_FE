import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/auth.guard';
 import { AuthComponent } from './modules/auth/auth.component';


const routes: Routes = [
    {
     path:'',
     loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)
   },
  // {
  //   path:'*',
  //   component:AuthComponent
  // },
  {
    path:'dashboard',
    canActivate:[AdminGuard],
    loadChildren:()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

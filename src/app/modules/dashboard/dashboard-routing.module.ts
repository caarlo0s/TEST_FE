import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [{
  path:'',
  component:DashboardComponent,
  children:[
    {
      path:'stores',
      canActivate:[AdminGuard],
      loadChildren:()=>import('./store/store.module').then(m=>m.StoreModule)
    },
    {
      path:'products',
      canActivate:[AdminGuard],
      loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)
    },
    {
      path:'clients',
      canActivate:[AdminGuard],
      loadChildren:()=>import('./clients/clients.module').then(m=>m.ClientsModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

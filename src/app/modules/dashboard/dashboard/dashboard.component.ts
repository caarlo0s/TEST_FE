import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarModel } from 'src/app/core/models/carModel';
import { StoreModel } from 'src/app/core/models/store.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { EcommerceService } from 'src/app/core/services/ecommerce.service';
import { StoreService } from 'src/app/core/services/store.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  subs = new Subscription();
  ecommerce: boolean;
  storeSelected:any=-1;
  showButtonCart:boolean=false;
  total:number=0;
  listStores: StoreModel[] = [];
  constructor(private authService: AuthService,
    private dashboardService: DashboardService,
    private ecommerceService: EcommerceService,
    private storeService: StoreService
  ) {
    this.getStores()
    this.ShowCart()
    this.closeSidebar()
    this.subs.add(
      this.ecommerceService.ecommerce$.subscribe(x => {
        this.ecommerce = x;
      })
    )
    this.subs.add(
      this.ecommerceService.cartProducts$.subscribe(x=>{
        if(x.products!=undefined|| x.products!=null)
        {
          this.total=0;
          x.products.forEach(x=>{
            this.total= this.total+x.cantidad;
          })

         this.showButtonCart=true;
        }
      })
    )

  }
  toggleSidebar() {
    $("#sideBarCart").toggleClass("move-to-left");
    $("#sidebar-tab").toggleClass("move-to-left");
    $("main").toggleClass("move-to-left-partly");
    $(".arrow").toggleClass("active");
  }
  closeSidebar() {
    $("#sideBarCart").removeClass("move-to-left");
    $("main").removeClass("move-to-left-partly");
    $("#sidebar-tab").removeClass("move-to-left");
    $(".arrow").removeClass("active");
  }
  ShowSideBardCart(){

  }
  ShowCart(){
      const cart=JSON.parse(localStorage.getItem('cart'));
      if(cart != null || cart!=undefined){
        this.showButtonCart=true;
        this.ecommerceService.setCart(cart as CarModel);
      }
      else{
        this.ecommerceService.setCart({}as CarModel);
      }

  }
  getStores() {
    this.storeService.getStores().then(result => {
      this.listStores = result.data;

    })
  }
  singout() {
    this.authService.logOut();
  }
  onChangeStore(event:any){
    this.storeService.selectStore(event);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

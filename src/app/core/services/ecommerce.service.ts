import { Injectable } from "@angular/core";
import { UtileriaService } from "./utileriaService.service";
import { environment } from "src/enviroment/enviroment";
import { BehaviorSubject, Observable } from "rxjs";
import { CarModel } from "../models/carModel";
@Injectable({
  providedIn: 'root',
})

export class EcommerceService {


 private ecommerce = new BehaviorSubject<boolean>(false);
 ecommerce$= this.ecommerce.asObservable();

 private cartProducts = new BehaviorSubject<CarModel>({} as CarModel);
 cartProducts$ = this.cartProducts.asObservable();
  constructor(private http:UtileriaService){

  }

  setCart(cart:CarModel){
    this.cartProducts.next(cart)
  }

  show(){
    this.ecommerce.next(true)
  }
  hide(){
    this.ecommerce.next(false)
  }

  checkOut(prodcutCart:CarModel){
    return this.http.ApiCallAsync(environment.methodGet, environment.urlWebApi, "Product/GetProductXStore?id_tienda=").then(result => {
      return result
    })
  }
}

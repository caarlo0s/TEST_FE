import { Injectable } from "@angular/core";
import { UtileriaService } from "./utileriaService.service";
import { environment } from "src/enviroment/enviroment";
import { BehaviorSubject } from "rxjs";
import { StoreModel } from "../models/store.model";

@Injectable({
  providedIn: 'root',
})

export class StoreService {

  storeSubj =  new BehaviorSubject<number>(-1);
  storeSelected$ = this.storeSubj.asObservable();
  constructor(private http: UtileriaService) {

  }

  selectStore(store:number){
      this.storeSubj.next(store);
      //console.log(this.storeSubj.value)


  }

  addUpdateStore(id:number,sucursal: string, direccion: String) {
    const data = {
      'id_tienda': id,
      'sucursal': sucursal,
      'direccion': direccion,
    }
    return this.http.ApiCallAsync(environment.methodPost, environment.urlWebApi, "Store/AddUpdateStore", data).then(result => {
      return result
    })
  }
  deleteStore(id_tienda:number){

    return this.http.ApiCallAsync(environment.methodDelete, environment.urlWebApi, "Store/DeleteStore?id_tienda="+id_tienda).then(result => {
      return result
    })
  }
  getStores(){
    return this.http.ApiCallAsync(environment.methodGet, environment.urlWebApi, "Store/GetStores").then(result => {
      return result
    })
  }
}

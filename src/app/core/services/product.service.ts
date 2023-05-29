import { Injectable } from "@angular/core";
import { UtileriaService } from "./utileriaService.service";
import { environment } from "src/enviroment/enviroment";

@Injectable({
  providedIn: 'root',
})
export class ProductService{
  constructor(private http:UtileriaService){}

  AddUpdateProduct(id:number,codigo:string,decripcion:string,precio:number,imagen:string){
    const data = {
      'id_articulo': id,
      'codigo': codigo,
      'descripcion': decripcion,
      'precio': precio,
      'imagen': imagen,
    }
    return this.http.ApiCallAsync(environment.methodPost, environment.urlWebApi, "Product/AddUpdateProduct", data).then(result => {
      return result
    })
  }
  addUpdStock(id:number,id_articulo_r:number,id_tienda_r:number, stock:number){
    const data = {
      'id_stock_tienda': id,
      'id_articulo_r': id_articulo_r,
      'id_tienda_r': id_tienda_r,
      'stock': stock

    }
    return this.http.ApiCallAsync(environment.methodPost, environment.urlWebApi, "Product/addUpdProductStock",data).then(result => {
      return result
    })
  }
  GetStockXStore(codigo:string,id_articulo:number){

    return this.http.ApiCallAsync(environment.methodGet, environment.urlWebApi, "Product/GetStockXStore?codigo="+codigo+"&id_articulo="+id_articulo).then(result => {
      return result
    })
  }
  getproducts(){
    return this.http.ApiCallAsync(environment.methodGet, environment.urlWebApi, "Product/GetProducts").then(result => {
      return result
    })


  }
}

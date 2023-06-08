import { Component, OnDestroy } from '@angular/core';
import { CarModel } from 'src/app/core/models/carModel';
import { ProductModel } from 'src/app/core/models/product.model';
import { EcommerceService } from 'src/app/core/services/ecommerce.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StoreService } from 'src/app/core/services/store.service';
@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnDestroy {


  storeSelected: number;
  listProduct: ProductModel[] = [];

  constructor(private ecommerceService: EcommerceService,
    private storeService: StoreService,
    private productService: ProductService
  ) {
    this.ecommerceService.show();

    this.storeService.storeSelected$.subscribe((storeSelc) => {
      if (storeSelc > 0) {
      this.storeSelected=storeSelc;
        this.productService.getProductsXStrore(storeSelc).then((result) => {

          if (result.error === 0) {
            this.listProduct = result.data;
            console.log(this.listProduct)
          }
        })

      }

    })


  }
  AddTocart(product: ProductModel) {
    var oldCart = JSON.parse(localStorage.getItem('cart') )as CarModel;
    var NewCart = JSON.parse(localStorage.getItem('cart') )as CarModel;
    if(oldCart!=null || oldCart != undefined) {
        var existe =  oldCart.products.filter(x=>x.id_articulo==product.id_articulo)
        if(existe.length>=1){
           NewCart.products.forEach(x=>{
            if(x.id_articulo==product.id_articulo)
            {
              x.cantidad=x.cantidad+1;
              x.total= x.precio*x.cantidad;

            }
            NewCart.total= NewCart.total+x.precio;
           })
           localStorage.removeItem('cart');
           localStorage.setItem('cart', JSON.stringify(NewCart));
        }
        else{
          NewCart.products.push({

            id_articulo: product.id_articulo,
            descripcion: product.descripcion,
            cantidad: 1,
            precio: product.precio,
            total: product.precio
          });
          NewCart.total=NewCart.total+product.precio;
          localStorage.removeItem('cart');
          localStorage.setItem('cart', JSON.stringify(NewCart));
        }
        this.ecommerceService.setCart(NewCart)
    }
    else{

        var prodcutCart = {
          total: product.precio,
          sucursal:this.storeSelected,
          products: []
        }
        prodcutCart.products.push({

          id_articulo: product.id_articulo,
          descripcion: product.descripcion,
          cantidad: 1,
          precio: product.precio,
          total: product.precio
        });
        this.ecommerceService.setCart(prodcutCart)
        localStorage.setItem('cart', JSON.stringify(prodcutCart));


  }
}
  ngOnDestroy(): void {
    this.ecommerceService.hide();

  }
}

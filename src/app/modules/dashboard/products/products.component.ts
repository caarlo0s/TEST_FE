import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { ProductModel, StockStoreModel } from 'src/app/core/models/product.model';
import { StoreModel } from 'src/app/core/models/store.model';
import { ProductService } from 'src/app/core/services/product.service';
import { StoreService } from 'src/app/core/services/store.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  form!: FormGroup;
  formStock!: FormGroup;
  ipAddress: any;
  listProducts: ProductModel[] = [];
  listStore: StoreModel[] = [];
  isDisabled = true;
  selectedDevice:any;
  listStrockStroe:StockStoreModel[]=[];
  productStock:string;
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private storeService: StoreService) {
    this.form = this.formBuilder.group({
      id: [0, [Validators.required,]],
      codigo: [null, [Validators.required,]],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
    })
    this.formStock = this.formBuilder.group({
      id_stock_tienda: [0, [Validators.required,]],
      id_articulo_r: [null, [Validators.required,]],
      id_tienda_r: [null, Validators.required],
      stock: [null, Validators.required],
    })
  }
  ngOnInit(): void {
    this.getProductos();
    this.getStores();
  }
  onChange(newValue) {
    console.log(newValue);
    this.selectedDevice = newValue;
}
  getStores() {
    this.storeService.getStores().then(result => {
      this.listStore = result.data;
      console.log(this.listStore);
    })
  }
  getProductos() {
    this.productService.getproducts().then(result => {
      if (result.error === 0) {
        this.listProducts = result.data;
        console.log(this.listProducts)
      }
    })
  }
  AddProduct() {
    this.form = this.formBuilder.group({
      id: [0, [Validators.required,]],
      codigo: [null, [Validators.required,]],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
    })
    this.toggleSidebar("sidebarProdu");
  }

  editProduct(product: ProductModel) {
    this.form = this.formBuilder.group({
      id: [product.id_articulo, [Validators.required,]],
      codigo: [product.codigo, [Validators.required,]],
      descripcion: [product.descripcion, Validators.required],
      precio: [product.precio, Validators.required],
    })
    this.isDisabled = false;
    this.toggleSidebar("sidebarProdu");
  }
  deleteProduct(id_articulo: number) {

  }

  StockProduct(id_articulo_r:number) {
    this.formStock.controls['id_articulo_r'].setValue(id_articulo_r);
    this.toggleSidebar("sidebarProduStok");
  }
  AddStock() {

    const stock = $('#stockProduct').val();
    if (this.selectedDevice >0 && stock>0) {
      const form = this.formStock.value;
      this.productService.addUpdStock(0,form.id_articulo_r,this.selectedDevice,stock).then(result=>{

        if(result.error===0){
          alert("Se ha modificado el stock de la tienda")
          this.closeSidebar("sidebarProduStok");
        }
      })
    }
    else{
    alert("los valores deben ser mayores a 0")
    }
  }
  addUpdateProduct() {
    if (this.form.valid) {
      const form = this.form.value;

      this.productService.AddUpdateProduct(form.id, form.codigo, form.descripcion, form.precio, "").then(result => {
        if (result.error === 0) {
          if (form.id_articulo == 0)
            alert("Producto agreagdo")
          else
            alert("Producto modificado")
          this.getProductos();
          this.closeSidebar("sidebarProdu");
        }
      })
    }
  }

  GetStockXPRoduct(id_articulo:number,codigo:string){
      this.productService.GetStockXStore(codigo,id_articulo).then(result=>{
          if(result.error===0)
          {
            this.productStock=codigo
            this.listStrockStroe=result.data;
            this.toggleSidebar('sidebarProduStokShow')
          }
      })
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
  }
  toggleSidebar(sidebar:string) {
    $("#"+sidebar).toggleClass("move-to-left");
    $("#sidebar-tab").toggleClass("move-to-left");
    $("main").toggleClass("move-to-left-partly");
    $(".arrow").toggleClass("active");
  }
  closeSidebar(sidebar:string) {
    $("#"+sidebar).removeClass("move-to-left");
    $("main").removeClass("move-to-left-partly");
    $("#sidebar-tab").removeClass("move-to-left");
    $(".arrow").removeClass("active");
  }




}

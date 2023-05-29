import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreModel } from 'src/app/core/models/store.model';
import { StoreService } from 'src/app/core/services/store.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  form!: FormGroup;
  ipAddress: any;
  formEdit!: FormGroup;
  listStores: StoreModel[] = [];
  constructor(private storeService:StoreService,private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      id: [0, [Validators.required,]],
      sucursal: [null, [Validators.required,]],
      direccion: [null, Validators.required],
    })
  }

  ngOnInit(): void {
  this.getStores();
  }
  editClient(store:StoreModel){
    this.form = this.formBuilder.group({
      id: [store.id_tienda, [Validators.required,]],
      sucursal: [store.sucursal, [Validators.required,]],
      direccion: [store.direccion, Validators.required],
    })
    this.toggleSidebar();
  }
  deleteClient(id_tienda:number){
    this.storeService.deleteStore(id_tienda).then(result=>{
      if(result.error===0)
       alert("registro eliminado")
       this.getStores();

    })

  }
  getStores(){
    this.storeService.getStores().then(result => {
      this.listStores = result.data;
      console.log(this.listStores)
    })
  }
  AddStoreModal(){
    this.form = this.formBuilder.group({
      id: [0, [Validators.required,]],
      sucursal: [null, [Validators.required,]],
      direccion: [null, Validators.required],
    })
    this.toggleSidebar();
  }
  addStore(){
      if(this.form.valid)
      {
        const form =  this.form.value;
        this.storeService.addUpdateStore(form.id,form.sucursal,form.direccion).then(result=>{
          if(result.error===0)
          {
            if(form.id==0)
              alert("Tienda agregada correctamente")
              else
              alert("Tienda actualizada correctamente")

              this.getStores();
              this.closeSidebar();


          }
        })
      }
  }
  toggleSidebar() {
    $("#sidebarStore").toggleClass("move-to-left");
    $("#sidebar-tab").toggleClass("move-to-left");
    $("main").toggleClass("move-to-left-partly");
    $(".arrow").toggleClass("active");
  }
  closeSidebar() {
    $("#sidebarStore").removeClass("move-to-left");
    $("main").removeClass("move-to-left-partly");
    $("#sidebar-tab").removeClass("move-to-left");
    $(".arrow").removeClass("active");
  }
}

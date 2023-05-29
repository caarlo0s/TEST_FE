import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { ClientModel } from 'src/app/core/models/client.model';
import { ClientService } from 'src/app/core/services/client.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  form!: FormGroup;
  ipAddress: any;
  listClients: ClientModel[] = [];
  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      id: [0, [Validators.required,]],
      nombre: [null, [Validators.required,]],
      apellidos: [null, Validators.required],
      direccion: [null, Validators.required],
    })

  }

  getClients() {
    this.clientService.getClients().then(result => {
      this.listClients = result.data;
      console.log(this.listClients)
    })
  }
  ngOnInit(): void {
    this.getClients();
  }
  toggleSidebar() {
    $("#sidebarProdu").toggleClass("move-to-left");
    $("#sidebar-tab").toggleClass("move-to-left");
    $("main").toggleClass("move-to-left-partly");
    $(".arrow").toggleClass("active");
  }
  closeSidebar() {
    $("#sidebarProdu").removeClass("move-to-left");
    $("main").removeClass("move-to-left-partly");
    $("#sidebar-tab").removeClass("move-to-left");
    $(".arrow").removeClass("active");
  }
  AddClientModal() {
    this.form = this.formBuilder.group({
      id: [0, [Validators.required,]],
      nombre: [null, [Validators.required,]],
      apellidos: [null, Validators.required],
      direccion: [null, Validators.required],
    })
    this.toggleSidebar();

  }
  editClient(client: ClientModel) {
    this.form = this.formBuilder.group({
      id: [client.id_cliente, Validators.required],
      nombre: [client.nombre, [Validators.required]],
      apellidos: [client.apellidos, Validators.required],
      direccion: [client.direccion, Validators.required]

    })
    this.toggleSidebar();

  }
  deleteClient(id_cliente: number) {
    this.clientService.deleteCliente(id_cliente).then(result=>{
      if(result.error===0)
       alert("registro eliminado")
       this.getClients();

    })


  }
  addClient() {
    if (this.form.valid) {
      const form = this.form.value;
      this.clientService.addUpdateClient(form.id, form.nombre, form.apellidos, form.direccion).then(result => {
        if (result.error === 0) {
             this.getClients();
          this.closeSidebar();
          if (form.id == 0)
            alert("Registro ingresado");
          else
            alert("Registro actualziado");
        }
        else {

          alert(result.message);
        }

      })
    }

  }

}

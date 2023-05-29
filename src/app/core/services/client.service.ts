import { Injectable } from "@angular/core";
import { UtileriaService } from "./utileriaService.service";
import { ClientModel } from "../models/client.model";
import { environment } from "src/enviroment/enviroment";

@Injectable({
  providedIn: 'root',
})

export class ClientService {
  constructor(private http: UtileriaService) {

  }

  addUpdateClient(id:number,nombre: string, apellidos: string, direccion: String) {
    const data = {
      'id_cliente': id,
      'nombre': nombre,
      'apellidos': apellidos,
      'direccion': direccion,
    }
    return this.http.ApiCallAsync(environment.methodPost, environment.urlWebApi, "Client/AddUpdateClient", data).then(Client => {
      return Client
    })
  }
  deleteCliente(id_cliente:number){
    const data={
      id_cliente:id_cliente
    }
    return this.http.ApiCallAsync(environment.methodDelete, environment.urlWebApi, "Client/DeleteClient?id_cliente="+id_cliente).then(Client => {
      return Client
    })
  }
  getClients(){
    return this.http.ApiCallAsync(environment.methodGet, environment.urlWebApi, "Client/GetClients").then(Client => {
      return Client
    })
  }
}

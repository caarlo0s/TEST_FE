import { Injectable } from "@angular/core";
import { UtileriaService } from "./utileriaService.service";
import { environment } from "src/enviroment/enviroment";

@Injectable({
    providedIn: 'root',

})
export class DashboardService {

  constructor(  private http:UtileriaService ){

  }

  getInformation(){
    this.http.ApiCallAsync(environment.methodGet,environment.urlWebApi,'Dashboard/getInformation',{}).then(result=>{
      return result;
    })
  }
}

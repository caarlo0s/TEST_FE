import { Injectable } from "@angular/core";
 import { environment } from "src/enviroment/enviroment";
 import { UtileriaService } from "./utileriaService.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
       private http:UtileriaService,
       private router:Router
      ){}


    login(email:String, password:String){

        const data={
            'email':email,
            'password':password
        }
        return this.http.ApiCallAsync(environment.methodPost,environment.urlWebApi,"Auth/login",data).then(Auth=>{
          return Auth   })

    }

    logOut(){
        localStorage.removeItem("acces_token");
        localStorage.removeItem('user');
        this.router.navigate(['']);

    }



}

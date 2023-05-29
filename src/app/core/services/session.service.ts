import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService,JwtModule  } from '@auth0/angular-jwt';
import { AuthModel } from "../models/auth.model";

@Injectable({
    providedIn: 'root',

})
export class SessionServices {

    private sessionSub= new BehaviorSubject({} as AuthModel);
    session$ =this.sessionSub.asObservable();

    constructor(public jwtHelper: JwtHelperService){
      this.jwtHelper= new JwtHelperService();
    }



    setSession(session:AuthModel){
        localStorage.setItem("acces_token",session.token)
        localStorage.setItem("user",session.fullname)
        this.sessionSub.next(session);
    }

    isTokenExpired():boolean|null{

        const session=   localStorage.getItem("acces_token");
        if(session!=null){
            return this.jwtHelper.isTokenExpired(session);


        }
        return null
    }

}

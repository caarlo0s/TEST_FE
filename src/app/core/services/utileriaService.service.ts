import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Subscription, throwError, timeout } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
// import { SessionServices } from './session.service';

@Injectable({
  providedIn: 'root'
})

export class UtileriaService {
  urlApi: string;
  apiResult: any;
  subs = new Subscription();
  token: String;
  constructor(private http: HttpClient) {
    this.urlApi = "";

  }

  ApiCall(typeMethod: string, urlServer: string, apiName: string, data?: any) {
    this.urlApi = urlServer + apiName;
    const body = data;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    switch (typeMethod) {
      case 'POST': {
        this.apiResult = this.http.post(this.urlApi, body, httpOptions).pipe(timeout(environment.timeOut), catchError(this.handleError));
        break;
      }
      case 'GET': {
        this.apiResult = this.http.get(this.urlApi, body).pipe(timeout(environment.timeOut), catchError(this.handleError));
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    return this.apiResult;
  }


  async ApiCallAsync(typeMethod: string, urlServer: string, apiName: string, data?: any) {
    this.urlApi = urlServer + apiName;
    const body = data;
    let httpOptions={};
    const token= localStorage.getItem('acces_token');
    if(token!=undefined){
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
    }
    else{
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
    }


    switch (typeMethod) {
      case 'POST': {
        this.apiResult = await this.http.post(this.urlApi, body, httpOptions).pipe(timeout(20000), catchError(this.handleError)).toPromise();
        break;
      }
      case 'GET': {
        this.apiResult = await this.http.get(this.urlApi,httpOptions).pipe(timeout(20000), catchError(this.handleError)).toPromise();
        break;
      }
      case 'DELETE':{
        this.apiResult= await this.http.delete(this.urlApi,httpOptions).pipe(timeout(20000), catchError(this.handleError)).toPromise();
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    return this.apiResult;
  }



  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error

      errorMessage = `Error: ${error.error.message}`;

    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    return throwError(() => new Error(error));
  }
}

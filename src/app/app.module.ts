import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { CurrencyPipe, DatePipe, registerLocaleData,HashLocationStrategy,LocationStrategy } from '@angular/common';
import localeMx from '@angular/common/locales/es-MX'
import { environment } from 'src/enviroment/enviroment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
registerLocaleData(localeMx);
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          allowedDomains: [environment.allowed]
      },
  }),
    NgbModule,

  ],
  providers: [{ provide: LOCALE_ID, useValue: "es-MX" }, DatePipe, CurrencyPipe,{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

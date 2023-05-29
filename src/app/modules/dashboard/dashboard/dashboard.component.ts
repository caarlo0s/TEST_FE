import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  constructor(private authService:AuthService,private dashboardService:DashboardService){

  }
  singout(){
    this.authService.logOut();
  }

}

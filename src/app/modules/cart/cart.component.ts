import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarModel } from 'src/app/core/models/carModel';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productsCart: CarModel;
  totalProducts: number;
  constructor(private route: Router) { }
  ngOnInit(): void {
    var Cart = JSON.parse(localStorage.getItem('cart'));
    this.productsCart = Cart as CarModel
    if (this.productsCart != undefined || this.productsCart != null) {
      this.totalProducts = 0;
      this.productsCart.products.forEach(x => {

        this.totalProducts = this.totalProducts + x.cantidad;
      })
    }
    else {
      this.route.navigate(['/dashboard']);
    }

  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreFrontComponent } from "./store-front/store-front.component";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NavbarComponent } from "./navbar/navbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StoreFrontComponent, ShoppingCartComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[]
})
export class AppComponent {
  title = 'KeleShoppingSample';
}

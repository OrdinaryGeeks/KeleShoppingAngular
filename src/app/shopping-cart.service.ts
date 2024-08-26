import { Injectable } from '@angular/core';
import { InventoryItem } from './inventory-item.model';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCart } from './shopping-cart.model';
import { CartItem } from './cart-item.model';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItems : InventoryItem[]=[];

  apiURL = "https://localhost:7062/";
  
  private cartItemsSource = new BehaviorSubject<CartItem | null>(null);
  cart : ShoppingCart | null  = null;
  public cartEmpty = new BehaviorSubject<boolean>(true);
  currentCartItems = this.cartItemsSource.asObservable();
  cartID:string|null="";
  async addItemToCart(item:CartItem)
  {
    
    const localCart = localStorage.getItem("cart");

    if(localCart)
    this.cart = JSON.parse(localCart);
    if(!this.cart)
    {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
     var cartResponse= await fetch(this.apiURL + "shoppingCart", {
    method:"POST",
    headers:myHeaders
    });

    this.cart = await cartResponse.json();
    localStorage.setItem("cart", JSON.stringify(this.cart));
}

    this.cartItemsSource.next(item);

    
    //this.cartItems.push(item);
  }

 
  getItems()
  {
    return this.cartItems;
  }
}

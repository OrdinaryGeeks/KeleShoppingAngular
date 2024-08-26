import { Component } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { InventoryItem } from '../inventory-item.model';
import { CommonModule } from '@angular/common';
import {Subject} from 'rxjs';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';
import { CartItem } from '../cart-item.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {


  cartItems: CartItem[] = [];
  constructor(private routerService:Router, private cartService:ShoppingCartService, private inventoryService:InventoryService)
  {  
   

  }


  ngOnInit(){
    this.cartService.currentCartItems.subscribe(item => {if(item)this.cartItems.push(item)});    
    
   this.getCartItems();
   this.checkIfCartEmpty();
  }
  async purchase()
  {
    const purchaseSuccess = await this.inventoryService.purchase(this.cartItems);

    
    if(purchaseSuccess)
    {
      alert("Purchasing");
      setTimeout(() =>{
      alert("Thank you for your purchase");
      this.cartItems.length=0;
      localStorage.removeItem("cart");
      this.checkIfCartEmpty();
      this.routerService.navigate(['storeFront']);
      }, 10);

    }
    else{
      alert("Unable to make purchases");
      
    }
  }
  addUnit(index:number)
  {
    this.cartItems[index].unitsInCart++;
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
  }
  removeUnit(index:number)
  {
    this.cartItems[index].unitsInCart--;
    if(this.cartItems[index].unitsInCart <=0)
          this.cartItems = this.cartItems.filter(compareItem => this.cartItems[index].name!=compareItem.name);

    localStorage.setItem("cart", JSON.stringify(this.cartItems));
    this.checkIfCartEmpty();
  }

  checkIfCartEmpty()
  {
    if(this.cartItems.length <= 0)
      this.cartService.cartEmpty.next(true);
    else
    this.cartService.cartEmpty.next(false);
  }
  removeItem(index:number)
  {
    this.cartItems = this.cartItems.filter(compareItem => this.cartItems[index].name!=compareItem.name);
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
    this.checkIfCartEmpty();
  }
  getCartItems()
  {
    const cartJSON = localStorage.getItem("cart");
    if(cartJSON)
    this.cartItems = JSON.parse(cartJSON);
   // this.cartItems = this.cartService.getItems();
  }

}

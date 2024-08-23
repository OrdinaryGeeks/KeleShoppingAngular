import { Component } from '@angular/core';
import { InventoryItemListComponent } from '../inventory-item-list/inventory-item-list.component';
import { InventoryService } from '../inventory.service';
import { InventoryItem } from '../inventory-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-store-front',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './store-front.component.html',
  styleUrl: './store-front.component.css'
})
export class StoreFrontComponent {
  
  
  inputs : string [] = [];
  storeItems : InventoryItem [] = [];
  cartItems: InventoryItem[] = [];
  showItems: InventoryItem [] = [];
  constructor(private inventoryService: InventoryService, private cartService: ShoppingCartService)
  {

    const localItems = localStorage.getItem("inventory");
    if(localItems)
    this.storeItems = JSON.parse(localItems);
    for(let i = 0; i<this.storeItems.length; i++)
    this.inputs.push("");
    
    this.inventoryService.searchInput.subscribe(term=>{

      this.showItems = this.storeItems.filter(compareItem => compareItem.name.toLowerCase().indexOf(term.toLowerCase()) != -1)

      
    })

  }

  ngOnInit()
  {
    const localItems = localStorage.getItem("cart");
    if(localItems)
    this.cartItems = JSON.parse(localItems); 
  this.checkIfCartEmpty();
  
  }
  
  checkIfCartEmpty()
  {
    if(this.cartItems.length <= 0)
      this.cartService.cartEmpty.next(true);
    else
    this.cartService.cartEmpty.next(false);
  }

  addItem(id:number, index:number)
  {

    
    const item = (this.storeItems.find(p => p.inventoryItemId == id));
    if(item)
    {
 
    const cartItemIndex =this.cartItems.findIndex(compareItem => compareItem.name == item.name);
  
    if(parseInt(this.inputs[0]))
    {
    if(cartItemIndex >= 0)
    this.cartItems[cartItemIndex].unitsAvailable += parseInt(this.inputs[0]);
    else{
    this.cartItems.push({description:item.description, photoURL:item.photoURL,
      price: item.price, unitsAvailable: parseInt(this.inputs[index]), inventoryItemId:
      item.inventoryItemId, name: item.name   
    });
      }
    }
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
    this.cartService.cartEmpty.next(false);
    this.checkIfCartEmpty();
  
  }
  }
}

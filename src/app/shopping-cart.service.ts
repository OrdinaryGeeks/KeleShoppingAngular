import { Injectable } from '@angular/core';
import { InventoryItem } from './inventory-item.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItems : InventoryItem[]=[];
  
  private cartItemsSource = new BehaviorSubject<InventoryItem | null>(null);

  public cartEmpty = new BehaviorSubject<boolean>(true);
  currentCartItems = this.cartItemsSource.asObservable();

  addItem(item:InventoryItem)
  {
    this.cartItemsSource.next(item);
    //this.cartItems.push(item);
  }

  getItems()
  {
    return this.cartItems;
  }
}

import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  
  isCollapsed=false;
  isEmpty = false;

  constructor(private cartService:ShoppingCartService, private inventoryService : InventoryService)
  {
    this.cartService.cartEmpty.subscribe(data => this.isEmpty = data);
  }
  count : number =0;
  ngOnInit(){

    const cart = localStorage.getItem("cart");
    if(cart)
    {
      this.count = JSON.parse(cart).length;
    }

  }
  onSearchChange(event:Event)
    {
     
        this.inventoryService.searchInput.next((event.target as HTMLInputElement).value);

    }
}

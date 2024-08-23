import { Injectable } from '@angular/core';
import { InventoryItemComponent } from './inventory-item/inventory-item.component';
import { InventoryItem } from './inventory-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  searchInput=new BehaviorSubject("");
  InventoryItems : InventoryItem []=[];
  constructor() {

    const localItems = localStorage.getItem("inventory");

    if(localItems == null)
    {
    this.InventoryItems.push({name:"Furry Coat", inventoryItemId:0, description:"coat tagged with message", price:75.00, photoURL:"https://th.bing.com/th?id=OPHS.NKsud1i9mMNEAQ474C474&w=592&h=550&qlt=20&o=5&dpr=1.3&pid=21.1", unitsAvailable:20},
      {name:"Keychain of Love", inventoryItemId:1, description:"designer key chains with photo embedded", price:4.00, photoURL:"https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/legacy_dam/en-us/S001385903/keyring-hero-global-001?cb=1bab61ecd4522a18bf303bc9726354b69d71c331", unitsAvailable:15},
    {name:"Shirt of Remembrance", inventoryItemId:2, description:"shirt with photo", price:35.00, unitsAvailable:20, photoURL:"https://th.bing.com/th/id/OIP.7h_u8v58cWOKF7NPf_yElQHaF7?rs=1&pid=ImgDetMain"}
    );
    
    localStorage.setItem("inventory", JSON.stringify(this.InventoryItems));
   }
  }

   purchase(purchasedItems :InventoryItem[]):boolean
   {
    const localItems = localStorage.getItem("inventory");
    if(localItems)
    this.InventoryItems = JSON.parse(localItems);
    let unavailable = false;
    for(let i =0; i<purchasedItems.length; i++)
    {
      this.InventoryItems.find(compareItem => {if(compareItem.name == purchasedItems[i].name){
        if(compareItem.unitsAvailable < purchasedItems[i].unitsAvailable)
          unavailable = true;
      }})
    }

    if(!unavailable)
    {
      for(let i =0; i<purchasedItems.length; i++)
      {
        
        this.InventoryItems.find(compareItem => compareItem.name == purchasedItems[i].name)!.unitsAvailable -= purchasedItems[i].unitsAvailable;
        console.log(this.InventoryItems);
      }
      localStorage.setItem("inventory", JSON.stringify(this.InventoryItems));
    return true;
    }
    else
    return false;



   }
}

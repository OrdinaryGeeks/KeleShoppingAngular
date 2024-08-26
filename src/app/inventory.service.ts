import { Injectable } from '@angular/core';
import { InventoryItemComponent } from './inventory-item/inventory-item.component';
import { InventoryItem } from './inventory-item.model';
import { BehaviorSubject } from 'rxjs';
import { StoreFront } from './store-front.model';
import { CartItem } from './cart-item.model';
import { InventoryItemDTO } from './inventory-item-dto.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  searchInput=new BehaviorSubject("");
  InventoryItems : InventoryItem []=[];
  storeFront: StoreFront |null=null;
  apiURL = "https://localhost:7062/api/";
  

  async getItems()
  {
   
    
    const localStore = localStorage.getItem("store");
    if(localStore)
      this.storeFront= JSON.parse(localStore);
    
    if(this.storeFront)
    {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var getItemsResponse = await fetch(this.apiURL + "storefronts/items",
        {method:"POST",
          body:JSON.stringify(this.storeFront),
          headers:myHeaders
        }
      );
         localStorage.setItem("inventory", JSON.stringify(await getItemsResponse.json()));
         
         /*.then((json) => {this.InventoryItems = json;
          console.log(json);
          alert("In then");
        localStorage.setItem("inventory", JSON.stringify(this.InventoryItems));
        }
      );*/
    }
  }

  async addItems(itemsToBeAdded : InventoryItemDTO[])
  {
    
    const storeInventory = {storeInventory : itemsToBeAdded};
    const localStore = localStorage.getItem("store");
    if(localStore)
      this.storeFront= JSON.parse(localStore);
    
    if(this.storeFront)
    {
      console.log(JSON.stringify(itemsToBeAdded));
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var addItemResponse = await fetch(this.apiURL + "storefronts/"+this.storeFront.id+"/addItems",
        {method:"POST",
          body:JSON.stringify(itemsToBeAdded),
          headers:myHeaders
        }
      );

      if(addItemResponse.status != 204)
        alert("Items not added");
    }

  }
 
  
   async purchase(purchasedItems :CartItem[]):Promise<boolean>
   {
      
    let purchase = false;
      const localStore = localStorage.getItem("store");
    if(localStore)
    {
      this.storeFront= JSON.parse(localStore);
      if(this.storeFront)
      {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
     var storeResponse= await fetch(this.apiURL + "storeFronts/store/"+this.storeFront.id+"/purchase/", {
    method:"POST",
    body:JSON.stringify(purchasedItems),
    headers:myHeaders
    }).then(async response => 
       {if(!response.ok)
      throw new Error("Invalid operation in the Purchase " + response.statusText);

      const responseText = await response.text();
      //alert(responseText);
      if(responseText == "Items purchased")
      {
       alert("Purchase true");
       purchase = true;
       this.getItems();
              return true;
      }
      else
      return false;
    }).catch(error => {
        alert("Error");
    })
  }
  else
  return false;
}
else
return false;
if(!purchase)
  alert("Just returning false for some reason");
else
return true;
return false;
   }
    

   
  
}

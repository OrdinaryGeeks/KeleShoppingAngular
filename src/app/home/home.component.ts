import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { StoreFront } from '../store-front.model';
import { InventoryService } from '../inventory.service';
import { InventoryItem } from '../inventory-item.model';
import { InventoryItemDTO } from '../inventory-item-dto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterModule],
  providers:[], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  storeFront: StoreFront |null=null;;
  apiURL = "https://localhost:7062/api/";
  storeFrontName = "Kele Custom Designs"
  constructor(private router: Router, private inventoryService:InventoryService){
   
    this.getStore();
    
    
  }

  async getStore()
  {

    
    var storeResponse = await fetch(this.apiURL + "storeFronts/name/"+this.storeFrontName);

   

    if(storeResponse.status != 204)
    this.storeFront = await storeResponse.json();

  

    if(this.storeFront)
    {
      console.log(this.storeFront);
      
      localStorage.setItem("store", JSON.stringify(this.storeFront));
      this.inventoryService.getItems();
    }
    else
    {
        this.addStore();
        alert("in else");
    }

  }
  async addStore()
  {


    const storeFrontDTO = {  name: this.storeFrontName}
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const request = new Request(this.apiURL + "storefronts", {
      method:"POST",
      body:JSON.stringify(storeFrontDTO),
      headers:myHeaders
      },
    );
  
     var storeResponse= await fetch(request);

    this.storeFront = await storeResponse.json();
    
    localStorage.setItem("store", JSON.stringify(this.storeFront));

    let inventoryItemsDTOs : InventoryItemDTO[] =[];
    if(this.storeFront)
    {
      inventoryItemsDTOs.push({storeFrontId:this.storeFront.id, name:"Furry Coat",  description:"coat tagged with message", price:75.00, photoURL:"https://th.bing.com/th?id=OPHS.NKsud1i9mMNEAQ474C474&w=592&h=550&qlt=20&o=5&dpr=1.3&pid=21.1", unitsAvailable:20});
      inventoryItemsDTOs.push({storeFrontId:this.storeFront.id,name:"Keychain of Love",  description:"designer key chains with photo embedded", price:4.00, photoURL:"https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/legacy_dam/en-us/S001385903/keyring-hero-global-001?cb=1bab61ecd4522a18bf303bc9726354b69d71c331", unitsAvailable:15});
      inventoryItemsDTOs.push({storeFrontId:this.storeFront.id,name:"Shirt of Remembrance", description:"shirt with photo", price:35.00, unitsAvailable:20, photoURL:"https://th.bing.com/th/id/OIP.7h_u8v58cWOKF7NPf_yElQHaF7?rs=1&pid=ImgDetMain"});
    }
    this.inventoryService.addItems(inventoryItemsDTOs);
    this.inventoryService.getItems();
    //localStorage.setItem("inventory", JSON.stringify(inventoryItems));

  }
}

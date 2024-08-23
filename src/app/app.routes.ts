import { Routes } from '@angular/router';
import { StoreFrontComponent } from './store-front/store-front.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartService } from './shopping-cart.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
   {path: '', providers:[ShoppingCartService], component:HomeComponent},
    
    {path:"shopping", component:ShoppingCartComponent},
    {path:"storeFront", component:StoreFrontComponent},
    {path:"about", component:AboutComponent}

];

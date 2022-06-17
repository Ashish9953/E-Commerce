import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuardService } from './auth-guard.service';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutComponent } from './componets/about/about.component';
import { ContactComponent } from './componets/contact/contact.component';
import { HomeComponent } from './componets/home/home.component';
import { NoFoundComponentComponent } from './componets/no-found-component/no-found-component.component';
import { ProductComponent } from './componets/product/product.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { SignupComponent } from './signup/signup.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:"full"},
  {path:'home',component:HomeComponent},
  {path:'account',component:ProfileComponent,canActivate:[AuthGuardService]},
  {path:'about',component:AboutComponent},
  {path:'user',component:UserComponent,canActivate:[AuthGuardService]},
  {path:'products',component:ProductComponent,canActivate:[AuthGuardService]},
  
  {path:'cart',component:CartComponent,canActivate:[AuthGuardService]},
  {path:'cart/checkout',component:CheckoutComponent,canActivate:[AuthGuardService]},
  {path:'cart/checkout/thankyou',component:ThankyouComponent,canActivate:[AuthGuardService]},
  {path:'contact',component:ContactComponent,canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent},
  {path:'forget',component:ForgetPasswordComponent},
  {path:'signUp',component:SignupComponent},

  { path:'**',component:NoFoundComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

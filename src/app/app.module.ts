import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componets/home/home.component';
import { ProductComponent } from './componets/product/product.component';
import { AboutComponent } from './componets/about/about.component';
import { ContactComponent } from './componets/contact/contact.component';
import { NoFoundComponentComponent } from './componets/no-found-component/no-found-component.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
 
import { HttpClientModule } from '@angular/common/http';

import { FilterPipe } from './filter.pipe';
import { CartComponent } from './cart/cart.component';
import { FilterUserPipe } from './filter-user.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';

import { CheckoutComponent } from './checkout/checkout.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxPaginationModule } from 'ngx-pagination';

 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    AboutComponent,
    ContactComponent,
    NoFoundComponentComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    

    FilterPipe,
    CartComponent,
    FilterUserPipe,
   
    CheckoutComponent,
    ForgetPasswordComponent,
    ThankyouComponent,
    ProfileComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    NgxPaginationModule
   
   
   
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

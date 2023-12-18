import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel'
import 'ngx-slick-carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AllOrdersComponent } from './order/all-orders/all-orders.component';
import { OrderViewComponent } from './order/order-view/order-view.component';
import { RegisterComponent } from './register/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { ViewProfileComponent } from './userservice/view-profile/view-profile.component';
import { ViewSlotComponent } from './view-slot/view-slot.component';
import { AddSlotComponent } from './add-slot/add-slot.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CategoryComponent } from './category/category.component';
import { EditProfileComponent } from './userservice/edit-profile/edit-profile.component';
import { FooterComponent } from './footer/footer.component';
import { SlotListComponent } from './slot-list/slot-list.component';
import { SlotDetailsComponent } from './slot-details/slot-details.component';
import { ChatComponent } from './chat/chat.component';
import { ViewBookedSlotComponent } from './view-booked-slot/view-booked-slot.component';
// import { ImageService } from './userservice/';
import { ProductListComponent } from './product-description/slot-list/slot-list.component';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllOrdersComponent,
    OrderViewComponent,
    RegisterComponent,
    HomeComponent,
    ForgotComponent,
    ViewProfileComponent,
    SlotListComponent,
    ViewSlotComponent,
    AddSlotComponent,
    ProductDetailsComponent,
    UpdateProductComponent,
    ViewProductsComponent,
    AddProductComponent,
    NavbarComponent,
    SearchResultComponent,
    CategoryComponent,
    EditProfileComponent,
    FooterComponent,
    ViewSlotComponent,
    SlotDetailsComponent,
    ChatComponent,
    ViewBookedSlotComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SlickCarouselModule
  ],
  providers: [
    // ImageService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

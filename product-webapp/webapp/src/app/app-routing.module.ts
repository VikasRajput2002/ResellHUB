import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AddSlotComponent } from './add-slot/add-slot.component';
import { authGuardGuard } from './auth-guard.guard';
import { CategoryComponent } from './category/category.component';
import { ChatComponent } from './chat/chat.component';
// import { AddProductComponent } from './add-product/add-product.component';
// import { AddSlotComponent } from './add-slot/add-slot.component';
// import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { ForgotComponent } from './login/forgot/forgot.component';
// import { ForgotComponent } from './login/forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { AllOrdersComponent } from './order/all-orders/all-orders.component';
import { OrderViewComponent } from './order/order-view/order-view.component';
import { ProductListComponent } from './product-description/slot-list/slot-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
// import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register/register.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SlotDetailsComponent } from './slot-details/slot-details.component';
import { SlotListComponent } from './slot-list/slot-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { EditProfileComponent } from './userservice/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './userservice/view-profile/view-profile.component';
import { ViewBookedSlotComponent } from './view-booked-slot/view-booked-slot.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ViewSlotComponent } from './view-slot/view-slot.component';

const routes: Routes = [
  {
    path: 'orders',
    component: AllOrdersComponent
  },
  {
    path: 'orders/:id',
    component:OrderViewComponent
  },
  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

{path:'',component:HomeComponent, canActivate:[authGuardGuard]},
{ path: 'add-product', component: AddProductComponent },
  { path: 'view-products', component: ViewProductsComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'product-details/:id', component: SlotListComponent },
  { path: 'slot-list/:id', component: SlotListComponent },
  { path: 'product-details/:categoryName', component: ProductDetailsComponent },
  { path: 'product-details/:id', component: SlotDetailsComponent },
  { path: 'product/:id', component: ProductListComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'add-slot/:id', component: AddSlotComponent },
  { path: 'view-slot/:id', component: ViewSlotComponent },
  { path: 'slot-details/:productId', component: SlotDetailsComponent },
  { path: 'slot-list', component: SlotListComponent },
  { path: 'category/:categoryName', component: CategoryComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'view-profile', component: ViewProfileComponent },
{path:'search',component:SearchResultComponent},
{path:'chat',component:ChatComponent},
{ path:'view-booked-slots', component:ViewBookedSlotComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

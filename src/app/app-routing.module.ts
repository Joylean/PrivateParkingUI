import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './admin/home/home.component';
import { ManageCustomersComponent } from './admin/manage-customers/manage-customers.component';
import { ManageReservationsComponent } from './admin/manage-reservations/manage-reservations.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'admin',component:AdminComponent},
  {path:'customer_manage',component:ManageCustomersComponent},
  {path:'reservation_manage',component:ManageReservationsComponent},
  {path:'customer',component:CustomerComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

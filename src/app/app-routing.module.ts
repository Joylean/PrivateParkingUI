import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './admin/home/home.component';
import { ManageCustomersComponent } from './admin/manage-customers/manage-customers.component';
import { ManageReservationsComponent } from './admin/manage-reservations/manage-reservations.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';
import { ManageBookedSlotsComponent } from './customer/manage-booked-slots/manage-booked-slots.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'customer_manage',component:ManageCustomersComponent},
  {path:'reservation_manage',component:ManageReservationsComponent},
  {path:'',component:CustomerHomeComponent,outlet:"cutomerOutlet"},
  {path:'customer',component:CustomerHomeComponent,outlet:"cutomerOutlet"},
  {path:'booked_slots',component:ManageBookedSlotsComponent,outlet:"cutomerOutlet"},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

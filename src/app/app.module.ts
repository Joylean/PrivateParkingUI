import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ObjconversionPipe } from './objconversion.pipe';
import { ObjcarconversionPipe } from './objcarconversion.pipe';
import { DateconversionPipe } from './dateconversion.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from "@angular/material/sort";

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './admin/home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ManageCustomersComponent } from './admin/manage-customers/manage-customers.component';
import { ManageReservationsComponent } from './admin/manage-reservations/manage-reservations.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';
import { ManageBookedSlotsComponent } from './customer/manage-booked-slots/manage-booked-slots.component';
import { CustomerHomeChildComponent } from './customer/customer-home-child/customer-home-child.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CustomerComponent,
    PageNotFoundComponent,
    HomeComponent,
    SidenavComponent,
    ManageCustomersComponent,
    ManageReservationsComponent,
    CustomerHomeComponent,
    ManageBookedSlotsComponent,
    CustomerHomeChildComponent,
    ObjconversionPipe,
    ObjcarconversionPipe,
    DateconversionPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

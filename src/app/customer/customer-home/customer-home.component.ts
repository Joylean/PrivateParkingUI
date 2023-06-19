import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminMain } from 'app/models/adminMain.model';
import { AdminService } from 'app/services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css'],
})
export class CustomerHomeComponent implements OnInit{

  allAdminData:any;
  allAdmins:any;
  displayedColumn: string[] = ['action'];
  displayedColumns: string[] = [];
  displayedColumns1: string[] = [];
  displayedColumns2: string[] = [];
  displayedColumns3: string[] = [];
  displayedColumns4: string[] = [];

  amountToPay:number[] = [];
  dataSource!:MatTableDataSource<AdminMain>;
  adminData:AdminMain = {
    id:0,
    admin_name: "",
    slot_date: new Date(),
    time_slots_available: {},
    car_type: {},
    price: 0,
    number_of_slots: 0,
    cancellation_fee: 0
  }
  bookButtonClicked:Boolean=false;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private adminService:AdminService,
    private toastr:ToastrService) {
     }

  ngOnInit(): void {
    this.get_allAdminDetails();
  }

  get_allAdminDetails(){
    this.displayedColumns=[];
    this.displayedColumns1=[];
    this.displayedColumns2=[];
    this.displayedColumns3=[];
    this.displayedColumns4=[];
    this.displayedColumn=['action'];
    this.adminService.getAllAdminDetails().subscribe({
      next: (adminDetails:any) => {
        this.allAdminData=adminDetails;
        for (var k in this.allAdminData[0]) {
          if(k==='slot_date'){
            this.displayedColumns1.push(k);
          }else if(k==='time_slots_available'){
            this.displayedColumns2.push(k);
          }else if(k==='car_type'){
            this.displayedColumns3.push(k);
          }else if(k!=='id' && k!=='time_slots_available' && k!=='car_type' && k!=='slot_date'){
            this.displayedColumns4.push(k);
          }
          if(k!=='id'){
            this.displayedColumns.push(k);
          }
        }
        this.displayedColumn.unshift(...this.displayedColumns);
        this.dataSource = new MatTableDataSource(this.allAdminData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  FilterChange(event: Event) {
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue;
  }

  getrow(row:any) {
    // console.log(row); //Use this also for booking if needed. Now not required
  }

  Book(row:any){
    var id=row.id;
    console.log(row);
    this.amountToPay.push(row.cancellation_fee,row.price);
    for (var k in this.allAdminData) {
      this.allAdmins = this.allAdminData[k];
      if (this.allAdmins.id === id && this.allAdmins.id !== null && this.allAdmins.id !== undefined) {
        this.adminData=this.allAdminData[k];
        this.bookButtonClicked=true;
      }
    }
  }

  success(eve:Boolean){
    this.bookButtonClicked=false;
    this.get_allAdminDetails();
  }

  // refresh(){
  // }
  
}

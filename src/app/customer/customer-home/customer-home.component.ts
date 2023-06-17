import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminMain } from 'app/models/adminMain.model';
import { AdminService } from 'app/services/admin.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css'],
})
export class CustomerHomeComponent implements OnInit, AfterViewInit {

  allAdminData:any;
  displayedColumn: string[] = ['action'];
  displayedColumns: string[] = [];
  dataSource:any;
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

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private adminService:AdminService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.get_allAdminDetails();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  get_allAdminDetails(){
    this.displayedColumns=[];
    this.displayedColumn=['action'];
    this.adminService.getAllAdminDetails().subscribe({
      next: (adminDetails:any) => {
        this.allAdminData=adminDetails;
        for (var k in this.allAdminData[0]) {
          this.displayedColumns.push(k);
        }
        this.displayedColumn.unshift(...this.displayedColumns);
        this.dataSource = new MatTableDataSource(this.allAdminData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
        console.log(this.allAdminData, this.dataSource);
        console.log(this.displayedColumn)
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
    // console.log(row);
  }

  Book(row:any){
    var id=row.id;
    // this.service.getEmployee(id).subscribe({
    //   next: (employee:any) => {
    //     this.buttonAddUpdate=true;
    //     //open modal
    //     this.sendData=employee[0];
    //     this.displayStyle = "block";
    //     //Change all data to that of Update
    //     this.title='Update Employee Details';
    //     this.titleButton='Update';
    //   },
    //   error: (response) => {
    //     console.log(response);
    //   }
    // });
  }
}

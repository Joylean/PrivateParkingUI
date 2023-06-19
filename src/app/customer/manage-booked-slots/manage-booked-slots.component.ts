import { Component, OnInit } from '@angular/core';
import { CustomerMain } from 'app/models/customerMain';
import { CustomerService } from 'app/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-booked-slots',
  templateUrl: './manage-booked-slots.component.html',
  styleUrls: ['./manage-booked-slots.component.css']
})
export class ManageBookedSlotsComponent implements OnInit {

  getData:any;
  myName:string="";
  myBookedDetails:any[]=[];
  objectvalues:any;
  objectkeys:any;
  UpdateButtonClicked:boolean=false;
  sendCustData: CustomerMain = {
    id:0,
    customer_name: "",
    slot_date: new Date(),
    time_slot: "",
    car_type: "",
    slot_status:"",
    admin_id:0
  }
  constructor(private customerService:CustomerService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.myName="Sammy";
    this.get_Customers();
    this.objectvalues=Object.values;
    this.objectkeys=Object.keys;
  }

  get_Customers(){
    this.customerService.getAllCustomerDetails().subscribe({
      next: (allCustomers) => {
        this.getData = allCustomers;
        // console.log(this.getData);
        for (var k in allCustomers) {
          let allCusts=allCustomers[k];
          if (allCusts.customer_name === this.myName && allCusts.customer_name !== "") {
            this.myBookedDetails.push(allCustomers[k]);
          }
        }
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  updateCustomerData(upde:any){
    this.UpdateButtonClicked=true;
    this.sendCustData=upde;
  }

  success(eve:any){
    this.UpdateButtonClicked=false;
    location.reload();
  }

  deleteCustomerData(dele:any){
    const sendId=dele['id'];
    this.customerService.deleteCustomer(sendId).subscribe({
      next: () =>{
        this.toastr.warning('Successfully deleted the booking !', 'Deleted!');
        // location.reload();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

}

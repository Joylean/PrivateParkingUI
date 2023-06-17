import { Component, OnInit } from '@angular/core';
import { AdminMain } from 'app/models/adminMain.model';
import { AdminService } from 'app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css']
})
export class ManageReservationsComponent implements OnInit {


  getData: any;
  myName:string="";
  allAdmins: any;
  myadminData=[{}];
  objectvalues:any;
  objectkeys:any;
  UpdateButtonClicked:boolean=false;
  sendData: AdminMain = {
    id:0,
    admin_name: "",
    slot_date: new Date(),
    time_slots_available: {},
    car_type: {},
    price: 0,
    number_of_slots: 0,
    cancellation_fee: 0
  }

  constructor(private adminService:AdminService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.myName="Job"; //based on name we can get data for now because login part not implemented
    this.get_Admin();
    this.objectvalues=Object.values;
    this.objectkeys=Object.keys;
  }

  get_Admin(){
    this.myadminData.splice(0);
    this.adminService.getAllAdminDetails().subscribe({
      next: (adminDetails) => {
        this.getData = adminDetails;
        // console.log(this.getData);
        for (var k in adminDetails) {
          this.allAdmins = adminDetails[k];
          if (this.allAdmins.admin_name === this.myName && this.allAdmins.admin_name !== "") {
            this.myadminData.push(adminDetails[k]);
          }
        }
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  updateAdminData(adde:any){
    this.UpdateButtonClicked=true;
    this.sendData=adde;
  }

  success(eve:Boolean){
    location.reload();
  }

  deleteAdminData(adde:any){
    const sendId=adde['id'];
    this.adminService.deleteAdmin(sendId).subscribe({
      next: () =>{
        this.toastr.warning('Successfully deleted the slot !', 'Deleted!');
        // location.reload();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}

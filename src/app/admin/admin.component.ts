import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

admin:any;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin() {
    this.adminService.getAdmin().subscribe(
      result => {
        this.admin = result;
      },
      err => console.log(err)
    )
  }

}

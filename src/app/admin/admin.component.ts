import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public admin:any;

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin() {
    this.httpClient.get<any>(environment.apiUrl+"/api/admin").subscribe(
      response=>{
        console.log(response);
        this.admin=response;
      }
    )
  }

}

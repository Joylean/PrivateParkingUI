import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  public admin:any;
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  getBodyClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth>768){
      styleClass='body-trimmed';
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass='body-md-screen';
    }
    return styleClass;
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

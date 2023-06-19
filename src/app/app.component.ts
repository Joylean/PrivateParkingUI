import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface SideNavToggleCust{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PrivateParkingUI';
  admin:Boolean = true; //change this value to open admin page and customer page

  isSideNavCollapsed=false;
  screenWidth=0;

  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }

  onToggleSideNavCust(data:SideNavToggleCust):void{
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }
}

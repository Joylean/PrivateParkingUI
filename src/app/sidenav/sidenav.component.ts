import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger, keyframes } from '@angular/animations';
// import { keyframes } from '@mui/material';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut',[
      transition(':enter', [
        style({opacity:0}),
        animate('350ms', style({opacity:1}))
      ]),
      transition(':leave', [
        style({opacity:1}),
        animate('350ms', style({opacity:0}))
      ])
    ]),
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
        keyframes([
          style({transform:'rotate(0deg)',offset:'0'}),
          style({transform:'rotate(2turn)',offset:'1'}),
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @HostListener('window:resize',['$event'])
  collapsed = false;
  screenWidth = 0;
  navData = [
    {
      routeLink:'home',
      icon:'fal fa-home',
      label:'Admin Portal'
    },
    {
      routeLink:'customer_manage',
      icon:'fal fa-users',
      label:'Manage Customers'
    },
    {
      routeLink:'reservation_manage',
      icon:'fal fa-tasks',
      label:'Manage Reservations'
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.screenWidth=window.innerWidth;
  }

  onResize(event:any){
    this.screenWidth=window.innerWidth;
    if(this.screenWidth<=768){
      this.collapsed=false;
      this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
    }
  }


  toggleCollapse(): void{
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

  closeSideNav(): void{
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

}
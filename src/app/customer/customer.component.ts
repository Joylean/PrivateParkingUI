import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  constructor() { }

  ngOnInit(): void {
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
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adminForm = new FormGroup({
    Name: new FormControl(''),
    date: new FormControl(''),
  });

  //multiselect dropdown
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};

  constructor() { }

  ngOnInit(): void {
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   // itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("working");
    console.warn(this.adminForm.value);
  }

  updateProfile() {
    this.adminForm.patchValue({
      Name: 'Nancy Drew',
      date: ''
    });
  }

}

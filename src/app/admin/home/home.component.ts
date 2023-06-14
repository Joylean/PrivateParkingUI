import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import timeslot from './time_slot.json';
import cartype from './car_type.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adminForm!: FormGroup;

  //multiselect dropdown
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  dropdownListCars: any[] = [];
  selectedCars: any[] = [];
  dropdownSettingsCar: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    console.log(timeslot, cartype);
    this.dropdownList = timeslot;
    this.dropdownListCars = cartype;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsCar = {
      singleSelection: false,
      idField: 'car_id',
      textField: 'car_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  initForm(){
    this.adminForm= this.fb.group ({
      name: ['',[Validators.required, Validators.minLength(2)]],
      date: [new Date(),[Validators.required,this.dateValidator]],
      time_slots_available:['',[Validators.required]],
      car_type:['',[Validators.required]],
      price:['',[Validators.required,Validators.pattern("^[1-9][0-9]*$")]],
      number_of_slots:['',[Validators.required,Validators.pattern("^[1-9][0-9]*$")]],
      cancel:['',[Validators.required,Validators.pattern("^[1-9][0-9]*$")]]
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onItemSelectCar(item: any) {
    console.log(item);
  }
  onSelectAllCar(items: any) {
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

  dateValidator(control: AbstractControl){ 
    if(control){
      // const selected = new Date(control.value); changing it into detailed date
      const selected=control.value;
      const todayComplex = new Date();

    let month = '' + (todayComplex.getMonth() + 1);
    let day = '' + todayComplex.getDate();
    const year = todayComplex.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const today=[year, month, day].join('-');
  
      console.log(selected, today);
      if(!(control && selected)) {
        // if there's no control or no value, that's ok
        return null;
      }
  
      // return null if there's no errors
      return (selected > today || selected === today)
        ? null
        : {invalidDate: 'You cannot use past dates' } ;
    }
    return null;
  }
}

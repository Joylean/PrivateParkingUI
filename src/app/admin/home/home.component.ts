import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Admin } from 'app/models/admin.model';
import { AdminService } from 'app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import timeslot from './time_slot.json';
import cartype from './car_type.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() onSendBack=new EventEmitter<boolean>();
  @Input() dataSend: any;
  adminForm!: FormGroup;

  //multiselect dropdown
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  dropdownListCars: any[] = [];
  selectedCars: any[] = [];
  dropdownSettingsCar: any = {};
  dateNew:any;

  addAdminData: Admin = {
    admin_name: "",
    slot_date: new Date(),
    time_slots_available: {},
    car_type: {},
    price: 0,
    number_of_slots: 0,
    cancellation_fee: 0
  }
  updateSlot: boolean=false;

  constructor(
    private fb: FormBuilder,
    private adminservice: AdminService,
    private toastr: ToastrService
     ) { }

  ngOnInit(): void {
    this.initForm();

    //updateAdminData part
    this.updateFormLoad();

    this.dropdownList = timeslot;
    this.dropdownListCars = cartype;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 7,
      allowSearchFilter: true
    };
    this.dropdownSettingsCar = {
      singleSelection: false,
      idField: 'car_id',
      textField: 'car_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 5,
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

  updateFormLoad(){
    if(this.dataSend){
      this.updateSlot=true;
      //date conversion
      const newdate = new Date(this.dataSend.slot_date);
      let month = '' + (newdate.getMonth() + 1);
      let day = '' + (newdate.getDate()-1);
      const year = newdate.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      const simpleDate=[year, month, day].join('-');
      // console.log(simpleDate);

      //Prefilling fields
      this.adminForm.patchValue({
        name: this.dataSend.admin_name,
        date: simpleDate,
        time_slots_available: this.dataSend.time_slots_available["data"],
        car_type: this.dataSend.car_type["data"],
        price: this.dataSend.price,
        number_of_slots: this.dataSend.number_of_slots,
        cancel: this.dataSend.cancellation_fee,
      })
      this.selectedItems=this.dataSend.time_slots_available["data"];
      this.selectedCars=this.dataSend.car_type["data"];
      this.dateNew=simpleDate;
      // console.log(this.adminForm.value);
    }
  }

  onSubmit() {
    // name, date, time_slots_available, car_type, price, number_of_slots, cancel
    // TODO: Use EventEmitter with form value
    this.submitUpdateAdminForm();
    console.log(this.addAdminData);
    this.adminservice.addAdminDetails(this.addAdminData).subscribe({
    next: (admin) => {
      this.toastr.success('Successfully added the slot !', 'Success!');
      // location.reload();
    },
    error: (response) => {
      console.log(response);
    }
   });
  }

  onUpdate() {
    this.submitUpdateAdminForm();
    // console.log(this.dataSend.id,this.addAdminData);
    this.adminservice.updateAdminDetails(this.dataSend.id,this.addAdminData).subscribe({
      next: (admin) => {
        this.toastr.success('Successfully added the slot !', 'Success!');
        setTimeout(()=>{
          this.onSendBack.emit(true);
        }, 3000);
        // location.reload();
      },
      error: (response) => {
        console.log(response);
      }
     });
  }

  submitUpdateAdminForm(){
    // console.warn(this.adminForm.value);
    this.addAdminData.admin_name=this.adminForm.value.name;
    this.addAdminData.slot_date=this.adminForm.value.date;
    this.addAdminData.time_slots_available={"data":this.adminForm.value.time_slots_available};
    this.addAdminData.car_type={"data":this.adminForm.value.car_type};
    this.addAdminData.price=this.adminForm.value.price;
    this.addAdminData.number_of_slots=this.adminForm.value.number_of_slots;
    this.addAdminData.cancellation_fee=this.adminForm.value.cancel;
    // console.log(this.addAdminData);
  }

  dateValidator(control: AbstractControl){ 
    if(control){
      // const selected = new Date(control.value); changing it into detailed date
      const selected=control.value;
      const todayComplex = new Date();

    let month = '' + (todayComplex.getMonth() + 1);
    let day = '' + (todayComplex.getDate()-1);
    const year = todayComplex.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const today=[year, month, day].join('-');
  
      // console.log(selected, today);
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

  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }

  onItemSelectCar(item: any) {
    // console.log(item);
  }
  onSelectAllCar(items: any) {
    // console.log(items);
  }
}

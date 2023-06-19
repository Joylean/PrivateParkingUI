import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Customer } from 'app/models/customer.model';
import { CustomerService } from 'app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import statusslot from './status_slot.json';
import timeslot from '../../admin/home/time_slot.json';
import cartype from '../../admin/home/car_type.json';

@Component({
  selector: 'app-customer-home-child',
  templateUrl: './customer-home-child.component.html',
  styleUrls: ['./customer-home-child.component.css']
})
export class CustomerHomeChildComponent implements OnInit {

  @Output() onSendBack=new EventEmitter<Boolean>();
  @Input() dataSendToCustomerForm: any;
  @Input() dataSentToUpdateCustomerForm:any;
  @Input() amountToPay:any;
  customerForm!: FormGroup;

  //multiselect dropdown
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  dropdownListCars: any[] = [];
  selectedCars: any[] = [];
  dropdownSettingsCar: any = {};
  dropdownListStatus: any[] = [];
  selectedStatus: any[] = [];
  dropdownSettingsStatus: any = {};

  dateNew:any;

  addCustomerData: Customer = {
    customer_name: "",
    slot_date: new Date(),
    time_slot: "",
    car_type: "",
    slot_status:"",
    admin_id:0
  }
  updateSlot: boolean=false;
  statuses: any;
  timeslotUpdate:any;
  carUpdate:any;
  statusUpdate:any;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    // console.log(this.dataSendToCustomerForm);
    this.statuses=statusslot;

    if(this.dataSentToUpdateCustomerForm){
      for(let k of timeslot ){
        if(k["item_text"]===this.dataSentToUpdateCustomerForm["time_slot"]){
          this.timeslotUpdate=[k];
        }
      }
      for(let k of cartype ){
        if(k["car_text"]===this.dataSentToUpdateCustomerForm["car_type"]){
          this.carUpdate=[k];
        }
      }
      for(let k of this.statuses ){
        if(k["item_text"]===this.dataSentToUpdateCustomerForm["slot_status"]){
          this.statusUpdate=[k];
        }
      }
    }

    this.loadForm(); //for updation as well
    
    if(this.dataSendToCustomerForm){
      this.dropdownList = this.dataSendToCustomerForm["time_slots_available"]["data"];
      this.dropdownListCars = this.dataSendToCustomerForm["car_type"]["data"];
    } else{
      this.dropdownList=this.timeslotUpdate;
      this.dropdownListCars=this.carUpdate;
    }
    this.dropdownListStatus = this.statuses;
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };
    this.dropdownSettingsCar = {
      singleSelection: true,
      idField: 'car_id',
      textField: 'car_text',
      allowSearchFilter: true
    };
    this.dropdownSettingsStatus = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };
  }

  initForm(){
    this.customerForm= this.fb.group ({
      name: ['',[Validators.required, Validators.minLength(2)]],
      date: [new Date(),[Validators.required,this.dateValidator]],
      time_slot:['',[Validators.required]],
      car_type:['',[Validators.required]],
      slot_status:['',[Validators.required]]
    });
  }

  loadForm(){
    if(this.dataSentToUpdateCustomerForm){
      this.updateSlot=true;
      const newdate = new Date(this.dataSentToUpdateCustomerForm.slot_date);
      let month = '' + (newdate.getMonth() + 1);
      let day = '' + (newdate.getDate() - 1);
      const year = newdate.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      const simpleDate = [year, month, day].join('-');
      this.dateNew = simpleDate;
      // console.log(this.timeslotUpdate);
      this.selectedItems=this.timeslotUpdate;
      this.selectedCars=this.carUpdate;
      this.selectedStatus=this.statusUpdate;

      this.customerForm.get('name')?.disable();
      this.customerForm.get('date')?.disable();

      this.customerForm.patchValue({
        name: this.dataSentToUpdateCustomerForm.customer_name,
        date: this.dateNew,
        time_slot: this.dataSentToUpdateCustomerForm.time_slots_available,
        car_type: this.dataSentToUpdateCustomerForm.car_type,
        slot_status: this.dataSentToUpdateCustomerForm.slot_status,
      });

    }else if(this.dataSendToCustomerForm){
      const newdate = new Date(this.dataSendToCustomerForm["slot_date"]);
      let month = '' + (newdate.getMonth() + 1);
      let day = '' + (newdate.getDate() - 1);
      const year = newdate.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      const simpleDate = [year, month, day].join('-');
      this.dateNew = simpleDate;
      this.customerForm.get('date')?.disable();
      if (!this.updateSlot) {
        this.selectedStatus = [{ "item_id": 1, "item_text": "Booked" }];
      }
    }
  }

  onSubmit(){
    this.submitUpdateCustomerForm();
    // console.log(this.addCustomerData);
    this.customerService.addCustomerDetails(this.addCustomerData).subscribe({
    next: (customerAdminData) => {
      this.toastr.success('Successfully added the slot !', 'Success!');
      // console.log(customerAdmin);
      setTimeout(()=>{
        this.onSendBack.emit(true);
      }, 3000);
    },
    error: (response) => {
      console.log(response);
    }
   });
  }

  onUpdate(){
    this.submitUpdateCustomerForm();
    // console.log(this.dataSentToUpdateCustomerForm.id,this.addCustomerData);
    this.customerService.updateCustomerDetails(this.dataSentToUpdateCustomerForm.id,this.addCustomerData).subscribe({
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

  submitUpdateCustomerForm(){
    this.addCustomerData.slot_date=this.dateNew;
    this.addCustomerData.time_slot=this.customerForm.value.time_slot[0].item_text;
    this.addCustomerData.car_type=this.customerForm.value.car_type[0].car_text;
    this.addCustomerData.slot_status=this.customerForm.value.slot_status[0].item_text;
    if(this.dataSendToCustomerForm){
      this.addCustomerData.admin_id=this.dataSendToCustomerForm["id"];
      this.addCustomerData.customer_name=this.customerForm.value.name;
    }else{
      this.addCustomerData.customer_name=this.dataSentToUpdateCustomerForm.customer_name;
      this.addCustomerData.admin_id=this.dataSentToUpdateCustomerForm.admin_id;
    }
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

  onItemSelectStatus(item: any) {
    // console.log(item);
  }
  onSelectAllStatus(items: any) {
    // console.log(items);
  }

}

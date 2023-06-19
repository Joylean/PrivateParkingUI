import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Customer } from 'app/models/customer.model';
import { CustomerMain } from 'app/models/customerMain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseApiUrl:string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getAllCustomerDetails(): Observable<CustomerMain[]>{
    return this.http.get<CustomerMain[]>(this.baseApiUrl + '/api/customer');
  }

  getCustomerDetails(id: number):Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseApiUrl+'/api/customer/'+id);
  }

  
  addCustomerDetails(addAdmin: Customer):Observable<Customer[]> {
    return this.http.post<Customer[]>(this.baseApiUrl + '/api/customer',addAdmin);
  }

  updateCustomerDetails(id: number, updateAdminDetails:Customer):Observable<Customer[]> {
    return this.http.put<Customer[]>(this.baseApiUrl+'/api/customer/'+id,updateAdminDetails);
  }

  deleteCustomer(id: number):Observable<CustomerMain[]> {
    return this.http.delete<CustomerMain[]>(this.baseApiUrl+'/api/customer/'+id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Admin } from '../models/admin.model';
import { AdminMain } from 'app/models/adminMain.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseApiUrl:string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllAdminDetails(): Observable<AdminMain[]>{
    return this.http.get<AdminMain[]>(this.baseApiUrl + '/api/admin');
  }

  getAdminDetails(id: number):Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseApiUrl+'/api/admin/'+id);
  }

  
  addAdminDetails(addAdmin: Admin):Observable<Admin[]> {
    return this.http.post<Admin[]>(this.baseApiUrl + '/api/admin',addAdmin);
  }

  updateAdminDetails(id: number, updateAdminDetails:Admin):Observable<Admin[]> {
    return this.http.put<Admin[]>(this.baseApiUrl+'/api/admin/'+id,updateAdminDetails);
  }

  deleteAdmin(id: number):Observable<AdminMain[]> {
    return this.http.delete<AdminMain[]>(this.baseApiUrl+'/api/admin/'+id);
  }
}

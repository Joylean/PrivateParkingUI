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

  deleteAdmin(id: number):Observable<Admin[]> {
    return this.http.delete<Admin[]>(this.baseApiUrl+'/api/admin/'+id);
  }


  //in component
  // this.service.addAdminDetails(this.addEmployee).subscribe({
  //   next: (employee) => {
  //     location.reload();
  //   },
  //   error: (response) => {
  //     console.log(response);
  //   }
  // });


  // this.deptservice.getAllDepartments().subscribe({
  //   next: (departments) => {
  //     this.deptData=departments;
  //     for (var k in this.deptData[0]) {
  //       this.displayedDeptColumns.push(k);
  //     }
  //     this.dataDeptSource=new MatTableDataSource(this.deptData);
  //     this.dataDeptSource.paginator=this.paginator;
  //     this.dataDeptSource.sort=this.sort;
  //   },
  //   error: (response) => {
  //     console.log(response);
  //   }
  // })

  // var id=row.id;
  //   this.service.getEmployee(id).subscribe({
  //     next: (employee:any) => {
  //       this.buttonAddUpdate=true;
  //       //open modal
  //       this.sendData=employee[0];
  //       this.displayStyle = "block";
  //       //Change all data to that of Update
  //       this.title='Update Employee Details';
  //       this.titleButton='Update';
  //     },
  //     error: (response) => {
  //       console.log(response);
  //     }
  //   });


  // this.service.deleteEmployee(newId).subscribe({
  //   next: () =>{
  //     console.log("Deleted Successfully");
  //     location.reload();
  //   },
  //   error: (response) => {
  //     console.log(response);
  //   }
  // })
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Designation, Employees } from './employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private myhttp:HttpClient) { }
  employeeUrl:string='https://localhost:44372/api/Employees';
  designationUrl:string='https://localhost:44372/api/lDesignation';
  listEmployee:Employees[]=[];//For Grtting Data EmploeeList
  listDesignation:Designation[]=[];

  employeeData:Employees=new Employees(); // For Post Data /Insert Data 

  saveEmployee(){
    return this.myhttp.post(this.employeeUrl, this.employeeData);
  }

  updateEmployee(){
    return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}`, this.employeeData);
  }

  getEmployees():Observable<Employees[]>
  {
    return this.myhttp.get<Employees[]>(this.employeeUrl);
  }
  getDesignation():Observable<Designation[]>
  {
    return this.myhttp.get<Designation[]>(this.designationUrl);
  }

  deleteEmployee(id:number)
  {
    return this.myhttp.delete(`${this.employeeUrl}/${id}`);
  }

}

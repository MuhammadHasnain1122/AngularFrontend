import { Component, OnInit, ViewChild } from '@angular/core';
import { Employees } from '../shared/employees.model';
import { EmployeesService } from '../shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(public empService:EmployeesService, public datepipe:DatePipe, public toast:ToastrService) { }
  @ViewChild(EmployeeFormComponent) emp:EmployeeFormComponent;
  ngOnInit(): void {
   
   this.empService.getEmployees().subscribe(data=> {
     this.empService.listEmployee=data;
   });

  }

  populateEmployee(selecetedEmployee:Employees)
  {
    let df=this.datepipe.transform(selecetedEmployee.doj,'yyyy-MM-dd');
    selecetedEmployee.doj=df;
    this.empService.employeeData=selecetedEmployee;
    
    if(this.emp.isSlide==='off')
    {
     this.emp.hideShowSlide();
    }
  }
  delete(id:number)
  {
  if(confirm("Are you really want to delete this record?"))
  { 
    this.empService.deleteEmployee(id).subscribe(data=> {
      this.empService.getEmployees().subscribe(data=> {
      this.empService.listEmployee=data;
      this.toast.error('Sucess','Record Deleted');
      });
    },err=>{
     });
  }
  
  }


}
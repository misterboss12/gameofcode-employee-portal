import { Component, OnInit } from '@angular/core';
import { EmployeeState } from 'src/app/states/employee.states';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../../actions/employee.actions';


@Component({
  selector: 'app-vacation-days',
  templateUrl: './vacation-days.component.html',
  styleUrls: ['./vacation-days.component.css']
})
export class VacationDaysComponent implements OnInit {
  

  constructor(private employeeStore: Store<EmployeeState>) { }

  ngOnInit(): void {
  }

}

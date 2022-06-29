import { Component, OnInit } from '@angular/core';
import { EmployeeState } from 'src/app/states/employee.states';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../../actions/employee.actions';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-vacation-calendar',
  templateUrl: './vacation-calendar.component.html',
  styleUrls: ['./vacation-calendar.component.css']
})
export class VacationCalendarComponent implements OnInit {
form:Form[];
  constructor(private employeeStore: Store<EmployeeState>) { }

  ngOnInit(): void {
  }

}

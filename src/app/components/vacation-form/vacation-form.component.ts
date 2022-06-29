import { Component, OnInit } from '@angular/core';
import { EmployeeState } from 'src/app/states/employee.states';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../../actions/employee.actions';
import { Form } from '@angular/forms';


@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.css']
})
export class VacationFormComponent implements OnInit {
  form:Form[];

  constructor(private employeeStore: Store<EmployeeState>) { }

  ngOnInit(): void {
  }

}

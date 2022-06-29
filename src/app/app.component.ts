import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmployeeState } from './states/employee.states';
import * as Employees from './actions/employee.actions';
import { getCurrentUserObject } from 'src/app/utils/userFunctions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoading: boolean;
  constructor(private employeeStore: Store<EmployeeState>) {
    this.isLoading = true;
  }

  private getEmployee() {
    // fetch employee after logging in
    if (getCurrentUserObject()) {
      this.employeeStore.dispatch(new Employees.GetEmployee());
    }
  }

  ngOnInit(): void {
    this.getEmployee();
    this.isLoading = false;
  }
}

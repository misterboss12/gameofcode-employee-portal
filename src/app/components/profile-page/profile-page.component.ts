import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeState } from 'src/app/states/employee.states';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  employee: Employee;

  constructor(private authService: AuthService, private store: Store<EmployeeState>) {}

  ngOnInit(): void {
    this.getUserEmployee();
  }

  private getUserEmployee(): void {
    this.store.select('employee').subscribe((response: any) => {
      if (response?.employee) {
        this.employee = response.employee;
      }
    });
  }

  public logOut(): void {
    this.authService.logout();
  }
}

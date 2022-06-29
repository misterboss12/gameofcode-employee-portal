import { EmployeeService } from '../../services/employee/employee.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RoutePaths } from '../../route-paths.enum';
import { Employee } from '../../models/employee.model';
import { EmployeeState } from 'src/app/states/employee.states';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  public employee: Employee;

  isLogged: boolean = false;
  routePaths: typeof RoutePaths;

  constructor(private authService: AuthService, private store: Store<EmployeeState>) {}

  private getEmployee(): void {
    this.store.select('employee').subscribe((response: any) => {
      if (response?.employee) {
        this.employee = response.employee;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn;
    this.routePaths = RoutePaths;

    if (this.isLogged) this.getEmployee();
  }
}

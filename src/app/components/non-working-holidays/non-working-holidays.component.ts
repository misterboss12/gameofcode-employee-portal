import { NonWorkingHoliday } from './../../models/nonWorkingHoliday.model';
import { Component, OnInit } from '@angular/core';
import excelExport from '../../utils/excelExport';
import { EmployeeState } from 'src/app/states/employee.states';
import { Store } from '@ngrx/store';
import * as Employees from '../../actions/employee.actions';

@Component({
  selector: 'app-non-working-holidays',
  templateUrl: './non-working-holidays.component.html',
  styleUrls: ['./non-working-holidays.component.css'],
})
export class NonWorkingHolidaysComponent implements OnInit {
  public nonWorkingHolidays: NonWorkingHoliday[];
  public columns = ['name', 'dateCelebrated', 'nonWorkingDayDate'];

  constructor(private employeeStore: Store<EmployeeState>) {}

  ngOnInit(): void {
    this.fetchNonWorkingHolidays();
  }

  private fetchNonWorkingHolidays() {
    this.employeeStore.dispatch(new Employees.GetNonWorkingHolidays());
    this.employeeStore.select('holidays').subscribe((response: any) => {
      if (response) {
        this.nonWorkingHolidays = response.holidays;
      }
    });
  }

  public exportNonWorkingHolidayList() {
    const nonWorkingHolidaysList = this.nonWorkingHolidays.map(({ name, dateCelebrated, nonWorkingDayDate }) => ({
      'Holiday Name': name,
      'Date Celebrated': dateCelebrated,
      'Non-working Day Date': nonWorkingDayDate,
    }));

    excelExport(nonWorkingHolidaysList, 'CANonWorkingHolidayList');
  }

  public printNonWorkingHolidays() {
    window.print();
  }
}

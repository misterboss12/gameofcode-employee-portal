import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { RoutePaths } from 'src/app/route-paths.enum';
import { User } from 'src/app/models/user.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConferenceComponent } from '../conference.component';
import { Conference } from 'src/app/models/conference.model';
import { getEmployeeId } from 'src/app/utils/userFunctions';

@Component({
  selector: 'app-add-conference',
  templateUrl: './add-conference.component.html',
  styleUrls: ['./add-conference.component.css'],
})
export class AddConferenceComponent implements OnInit {
  employees: Employee[] = [];
  user: User;
  routePaths: typeof RoutePaths = RoutePaths;
  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddConferenceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { parent: ConferenceComponent }
  ) {}
  conferenceTypes = ['Conference', 'Training', 'Udemy Course', 'Other Course'];
  addConferenceForm: FormGroup = this.formBuilder.group({
    conferenceType: ['', Validators.required],
    conferenceName: ['', Validators.required],
    dateAttended: [''],
    assignedBy: [''],
    certification: [''],
  });
  private getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  addConference(): void {
    const employeeId = getEmployeeId();
    const newConference: Conference = {
      employee: employeeId,
      conferenceType: this.addConferenceForm.controls.conferenceType.value,
      conferenceName: this.addConferenceForm.controls.conferenceName.value,
      dateAttended: this.addConferenceForm.controls.dateAttended.value,
      assignedBy: this.addConferenceForm.controls.assignedBy.value,
      certification: this.addConferenceForm.controls.certification.value,
    };
    this.dialogRef.close(newConference);
  }

  ngOnInit(): void {
    this.getEmployees();
  }
}

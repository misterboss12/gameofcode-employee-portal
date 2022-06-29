import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { RoutePaths } from 'src/app/route-paths.enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConferenceComponent } from '../conference.component';
import { Conference } from 'src/app/models/conference.model';
@Component({
  selector: 'app-edit-conference',
  templateUrl: './edit-conference.component.html',
  styleUrls: ['./edit-conference.component.css'],
})
export class EditConferenceComponent implements OnInit {
  employees: Employee[] = [];
  routePaths: typeof RoutePaths = RoutePaths;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private location: Location,
    public dialogRef: MatDialogRef<EditConferenceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { conference: Conference; parent: ConferenceComponent }
  ) {}
  conferenceTypes = ['Conference', 'Training', 'Udemy Course', 'Other Course'];

  editConferenceForm: FormGroup = this.formBuilder.group({
    conferenceType: ['', Validators.required],
    conferenceName: ['', Validators.required],
    dateAttended: [''],
    assignedBy: [''],
    certification: [''],
  });

  private getConference(): void {
    this.editConferenceForm.patchValue({
      id: this.data.conference.id,
      employee: this.data.conference.employee,
      conferenceType: this.data.conference.conferenceType,
      conferenceName: this.data.conference.conferenceName,
      dateAttended: this.data.conference.dateAttended,
      assignedBy: this.data.conference.assignedBy.id.toString(),
      certification: this.data.conference.certification,
    });
  }

  private getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }
  updateConference(): void {
    const newConference: Conference = {
      id: this.data.conference.id,
      employee: this.data.conference.employee,
      conferenceType: this.editConferenceForm.controls.conferenceType.value,
      conferenceName: this.editConferenceForm.controls.conferenceName.value,
      dateAttended: new Date(this.editConferenceForm.controls.dateAttended.value),
      assignedBy: this.editConferenceForm.controls.assignedBy.value,
      certification: this.editConferenceForm.controls.certification.value,
    };
    this.dialogRef.close(newConference);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getConference();
    this.getEmployees();
  }
}

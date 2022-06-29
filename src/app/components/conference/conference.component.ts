import { Component, OnInit } from '@angular/core';
import { Conference } from 'src/app/models/conference.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActionDialogComponent } from 'src/app/components/action-dialog/action-dialog.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EditConferenceComponent } from './edit-conference/edit-conference.component';
import { Employee } from 'src/app/models/employee.model';
import { AddConferenceComponent } from './add-conference/add-conference.component';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../../actions/employee.actions';
import { EmployeeState } from 'src/app/states/employee.states';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css'],
})
export class ConferenceComponent implements OnInit {
  conferences: Conference[];
  filteredConferences: Conference[];
  employee: Employee;

  conferenceColumns = ['conferenceType', 'conferenceName', 'dateAttended', 'assignedBy', 'certification', 'action'];

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private employeeStore: Store<EmployeeState>
  ) {}

  public fetchEmployee() {
    this.employeeStore.select('conferences').subscribe((response: any) => {
      if (response) {
        this.conferences = response.conferences;
        this.filteredConferences = this.conferences;
      }
    });
  }

  editConference(conference: Conference) {
    const dialogOptions = new MatDialogConfig();
    dialogOptions.disableClose = true;
    dialogOptions.width = '850px';
    dialogOptions.data = { conference: conference, parent: this };

    const dialogRef = this.dialog.open(EditConferenceComponent, dialogOptions);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if (!data) {
          // if nothing was edited
          dialogRef.close();
          return;
        }

        this.employeeStore.dispatch(new EmployeeActions.UpdateConference(data));
        this.notificationService.showSuccess(`${data.conferenceName} edited.`);
      },
      (err) => this.notificationService.showError()
    );
  }

  addConference() {
    const dialogOptions = new MatDialogConfig();
    dialogOptions.disableClose = true;
    dialogOptions.width = '850px';
    dialogOptions.data = { parent: this };

    const dialogRef = this.dialog.open(AddConferenceComponent, dialogOptions);

    dialogRef.afterClosed().subscribe((data) => {
      if (data === null || !data) {
        // if cancel button was clicked
        dialogRef.close();
        return;
      }
      this.employeeStore.dispatch(new EmployeeActions.AddConference(data));
      this.notificationService.showSuccess(`${data.conferenceName} added.`);
      (err) => this.notificationService.showError();
    });
  }

  deleteConference(conference: Conference): void {
    const deleteActionDialogConfig = new MatDialogConfig();
    deleteActionDialogConfig.disableClose = true;
    deleteActionDialogConfig.width = '600px';
    deleteActionDialogConfig.data = {
      status: '',
      action: 'delete',
      item: 'conference',
    };

    const dialogActionRef = this.dialog.open(ActionDialogComponent, deleteActionDialogConfig);

    dialogActionRef.afterClosed().subscribe((status) => {
      if (status === 'yes') {
        this.employeeStore.dispatch(new EmployeeActions.DeleteConference(conference));
        this.notificationService.showSuccess(`${conference.conferenceName} deleted.`);
        (err) => this.notificationService.showError();
      }
    });
  }

  filterByName(input: String): void {
    const name = input.split(' ').join('').toLowerCase().trim();
    this.filteredConferences = this.conferences.filter((element) =>
      element.conferenceName.toLowerCase().includes(name)
    );
  }

  ngOnInit() {
    // load the initial page
    this.fetchEmployee();
  }
}

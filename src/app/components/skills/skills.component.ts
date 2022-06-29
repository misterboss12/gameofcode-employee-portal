import { EditSkillComponent } from '../edit-skill/edit-skill.component';
import { NotificationService } from '../../services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { RoutePaths } from '../../route-paths.enum';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSkillComponent } from '../add-skill/add-skill.component';
import { Skill } from 'src/app/models/skill.model';
import { AuthService } from '../../services/auth/auth.service';
import { SkillDescriptionComponent } from '../skill-description/skill-description.component';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { EmployeeState } from 'src/app/states/employee.states';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../../actions/employee.actions';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skills: Skill[];
  employeeDataSource: MatTableDataSource<Employee>;
  routePaths: typeof RoutePaths;
  employee: Employee;
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService,
    private employeeStore: Store<EmployeeState>
  ) {}

  public smallDesc: string;
  logout(): void {
    this.authService.logout();
  }

  ngAfterViewChecked(): void {
    this.colorStarsPerSkillLevel();
  }

  public fetchSkills() {
    this.employeeStore.select('skills').subscribe((response: any) => {
      if (response?.skills) {
        this.skills = response.skills;
      }
    });
  }

  public fetchEmployee() {
    this.employeeStore.select('employee').subscribe((response: any) => {
      if (response?.employee) {
        this.employee = response.employee;
      }
    });
  }

  colorStarsPerSkillLevel() {
    if (!this.employee) return;

    this.skills.forEach((skill) => {
      const card = document.getElementById(`${skill.id}`);
      const stars = Array.from(card.getElementsByClassName('icon-star'));

      for (let i = 0; i < skill.level; i++) {
        stars[i].classList.add('rank');
      }
    });
  }

  openAddNewSkillDialog() {
    const dialogOptions = new MatDialogConfig();
    dialogOptions.disableClose = true;
    dialogOptions.width = '1000px';
    dialogOptions.data = { parent: this };
    const dialogRef = this.dialog.open(AddSkillComponent, dialogOptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        dialogRef.close();
        return;
      }
      this.employeeStore.dispatch(new EmployeeActions.AddSkill(data));
      this.notificationService.showSuccess(`${data.skillname} added.`);
      (err) => this.notificationService.showError();
    });
  }

  openEditSkillDialog(skill: Skill) {
    const dialogOptions = new MatDialogConfig();
    dialogOptions.disableClose = true;
    dialogOptions.width = '850px';
    dialogOptions.data = { skill, parent: this };

    const dialogRef = this.dialog.open(EditSkillComponent, dialogOptions);

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        dialogRef.close();
        return;
      }
      this.employeeStore.dispatch(new EmployeeActions.UpdateSkill(data));
      this.notificationService.showSuccess(`${data.skillname} edited.`);
      (err) => this.notificationService.showError();
    });
  }

  public openDeleteSkillDialog(skill: Skill) {
    const deleteActionDialogConfig = new MatDialogConfig();
    deleteActionDialogConfig.disableClose = true;
    deleteActionDialogConfig.width = '500px';
    deleteActionDialogConfig.data = {
      status: '',
      action: 'delete',
      item: 'skill',
    };

    const dialogActionRef = this.dialog.open(ActionDialogComponent, deleteActionDialogConfig);

    dialogActionRef.afterClosed().subscribe((status) => {
      if (status === 'yes') {
        this.employeeStore.dispatch(new EmployeeActions.DeleteSkill(skill));
        this.notificationService.showSuccess(`${skill.skillname} deleted.`);
      }
      (err) => this.notificationService.showError;
    });
  }

  isLargeDescription(skill: Skill) {
    if (skill.description === null) return false;
    // no skill description set
    else if (skill.description.length > 200) {
      this.smallDesc = skill.description.substring(0, 210);
      return true;
    } else return false;
  }

  openDescriptionDialog(skill: Skill, openDescriptionBox: boolean = false) {
    this.dialog.open(SkillDescriptionComponent, {
      width: '500px',
      data: { skill, parent: this, openDescriptionBox },
    });
  }

  ngOnInit(): void {
    this.fetchSkills();
    this.fetchEmployee();
  }
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as EmployeeActions from '../actions/employee.actions';
import { switchMap, catchError, map, take } from 'rxjs/operators';
import { of } from 'rxjs';

import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../models/employee.model';
import { ConferenceService } from '../services/conference/conference.service';
import { Conference } from '../models/conference.model';
import { SkillCrudService } from '../services/skill-crud/skill-crud.service';
import { Skill } from '../models/skill.model';
import { HolidayService } from '../services/holiday/holiday.service';
import { NonWorkingHoliday } from '../models/nonWorkingHoliday.model';
import { EmployeeState } from '../states/employee.states';
import { Store } from '@ngrx/store';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private store: Store<EmployeeState>,
    private employeeService: EmployeeService,
    private conferenceService: ConferenceService,
    private skillService: SkillCrudService,
    private holidaysService: HolidayService
  ) {}

  @Effect()
  getEmployee$ = this.actions$.pipe(
    ofType(EmployeeActions.EmployeeActionType.GET_EMPLOYEE),
    switchMap(() =>
      this.employeeService.getUserEmployee().pipe(
        map((employee: Employee) => new EmployeeActions.GetEmployeeSuccess(employee)),
        catchError((error) => of(new EmployeeActions.GetEmployeeFailed(error)))
      )
    ),
    take(1)
  );

  @Effect()
  addConference$ = this.actions$.pipe(
    ofType(EmployeeActions.EmployeeActionType.ADD_CONFERENCE),
    switchMap((action) => {
      return this.conferenceService.createConference(action['payload']).pipe(
        map((conference: Conference) => new EmployeeActions.AddConferenceSuccess(conference)),
        catchError((error) => of(new EmployeeActions.AddConferenceFailed(error)))
      );
    })
  );

  @Effect()
  updateConference$ = this.actions$.pipe(
    ofType(EmployeeActions.EmployeeActionType.UPDATE_CONFERENCE),
    switchMap((action) =>
      this.conferenceService.updateConference(action['payload']).pipe(
        map((conference: Conference) => new EmployeeActions.UpdateConferenceSuccess(conference)),
        catchError((error) => of(new EmployeeActions.UpdateConferenceFailed(error)))
      )
    )
  );

  @Effect()
  deleteConference$ = this.actions$.pipe(
    ofType(EmployeeActions.EmployeeActionType.DELETE_CONFERENCE),
    switchMap((action) =>
      this.conferenceService.deleteConference(action['payload']).pipe(
        map((Conference: Conference) => new EmployeeActions.DeleteConferenceSuccess(Conference)),
        catchError((error) => of(new EmployeeActions.DeleteConferenceFailed(error)))
      )
    )
  );

  @Effect()
  addSkill$ = this.actions$.pipe(
    ofType(EmployeeActions.EmployeeActionType.ADD_SKILL),
    switchMap((action) => {
      return this.skillService.addSkill(action['payload']).pipe(
        map((skill: Skill) => new EmployeeActions.AddSkillSuccess(skill)),
        catchError((error) => of(new EmployeeActions.AddSkillFailed(error)))
      );
    })
  );

  @Effect()
  updateSkill$ = this.actions$.pipe(
    ofType(EmployeeActions.EmployeeActionType.UPDATE_SKILL),
    switchMap((action) =>
      this.skillService.editSkill(action['payload']).pipe(
        map((skill: Skill) => new EmployeeActions.UpdateSkillSuccess(skill)),
        catchError((error) => of(new EmployeeActions.UpdateSkillFailed(error)))
      )
    )
  );

  @Effect()
  deleteSkill$ = this.actions$.pipe(
    ofType(EmployeeActions.EmployeeActionType.DELETE_SKILL),
    switchMap((action) =>
      this.skillService.deleteSkill(action['payload']).pipe(
        map((skill: Skill) => new EmployeeActions.DeleteSkillSuccess(skill)),
        catchError((error) => of(new EmployeeActions.DeleteSkillFailed(error)))
      )
    )
  );

  @Effect()
  getNonWorkingHolidays$ = this.actions$.pipe(
    ofType(EmployeeActions.EmployeeActionType.GET_NON_WORKING_HOLIDAYS),
    switchMap(() =>
      this.holidaysService.getNonWorkingHolidays().pipe(
        map((holidays: NonWorkingHoliday[]) => new EmployeeActions.GetNonWorkingHolidaysSuccess(holidays)),
        catchError((error) => of(new EmployeeActions.GetNonWorkingHolidaysFailed(error)))
      )
    ),
    take(1)
  );
}

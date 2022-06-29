import { Action } from '@ngrx/store';
import { Conference } from '../models/conference.model';
import { Employee } from '../models/employee.model';
import { NonWorkingHoliday } from '../models/nonWorkingHoliday.model';
import { Skill } from '../models/skill.model';

export enum EmployeeActionType {
  GET_EMPLOYEE = 'GET_EMPLOYEE',
  GET_EMPLOYEE_SUCCESS = 'GET_EMPLOYEE_SUCCESS',
  GET_EMPLOYEE_FAILED = 'GET_EMPLOYEE_FAILED',
  ADD_CONFERENCE = 'ADD_CONFERENCE',
  ADD_CONFERENCE_SUCCESS = 'ADD_CONFERENCE_SUCCESS',
  ADD_CONFERENCE_FAILED = 'ADD_CONFERENCE_FAILED',
  UPDATE_CONFERENCE = 'UPDATE_CONFERENCE',
  UPDATE_CONFERENCE_SUCCESS = 'UPDATE_CONFERENCE_SUCCESS',
  UPDATE_CONFERENCE_FAILED = 'UPDATE_CONFERENCE_FAILED',
  DELETE_CONFERENCE = 'DELETE_CONFERENCE',
  DELETE_CONFERENCE_SUCCESS = 'DELETE_CONFERENCE_SUCCESS',
  DELETE_CONFERENCE_FAILED = 'DELETE_CONFERENCE_FAILED',
  ADD_SKILL = 'ADD_SKILL',
  ADD_SKILL_SUCCESS = 'ADD_SKILL_SUCCESS',
  ADD_SKILL_FAILED = 'ADD_SKILL_FAILED',
  UPDATE_SKILL = 'UPDATE_SKILL',
  UPDATE_SKILL_SUCCESS = 'UPDATE_SKILL_SUCCESS',
  UPDATE_SKILL_FAILED = 'UPDATE_SKILL_FAILED',
  DELETE_SKILL = 'DELETE_SKILL',
  DELETE_SKILL_SUCCESS = 'DELETE_SKILL_SUCCESS',
  DELETE_SKILL_FAILED = 'DELETE_SKILL_FAILED',
  GET_NON_WORKING_HOLIDAYS = 'GET_NON_WORKING_HOLIDAYS',
  GET_NON_WORKING_HOLIDAYS_SUCCESS = 'GET_NON_WORKING_HOLIDAYS_SUCCESS',
  GET_NON_WORKING_HOLIDAYS_FAILED = 'GET_NON_WORKING_HOLIDAYS_FAILED',
}

export class GetEmployee implements Action {
  readonly type = EmployeeActionType.GET_EMPLOYEE;
}

export class GetEmployeeSuccess implements Action {
  readonly type = EmployeeActionType.GET_EMPLOYEE_SUCCESS;
  constructor(public payload: Employee) {}
}

export class GetEmployeeFailed implements Action {
  readonly type = EmployeeActionType.GET_EMPLOYEE_FAILED;
  constructor(public payload: string) {}
}

export class AddConference implements Action {
  readonly type = EmployeeActionType.ADD_CONFERENCE;
  constructor(public payload: Conference) {}
}

export class AddConferenceSuccess implements Action {
  readonly type = EmployeeActionType.ADD_CONFERENCE_SUCCESS;
  constructor(public payload: Conference) {}
}

export class AddConferenceFailed implements Action {
  readonly type = EmployeeActionType.ADD_CONFERENCE_FAILED;
  constructor(public payload: string) {}
}

export class UpdateConference implements Action {
  readonly type = EmployeeActionType.UPDATE_CONFERENCE;
  constructor(public payload: Conference) {}
}

export class UpdateConferenceSuccess implements Action {
  readonly type = EmployeeActionType.UPDATE_CONFERENCE_SUCCESS;
  constructor(public payload: Conference) {}
}

export class UpdateConferenceFailed implements Action {
  readonly type = EmployeeActionType.UPDATE_CONFERENCE_FAILED;
  constructor(public payload: string) {}
}

export class DeleteConference implements Action {
  readonly type = EmployeeActionType.DELETE_CONFERENCE;
  constructor(public payload: Conference) {}
}

export class DeleteConferenceSuccess implements Action {
  readonly type = EmployeeActionType.DELETE_CONFERENCE_SUCCESS;
  constructor(public payload: Conference) {}
}

export class DeleteConferenceFailed implements Action {
  readonly type = EmployeeActionType.DELETE_CONFERENCE_FAILED;
  constructor(public payload: string) {}
}

export class AddSkill implements Action {
  readonly type = EmployeeActionType.ADD_SKILL;
  constructor(public payload: Skill) {}
}

export class AddSkillSuccess implements Action {
  readonly type = EmployeeActionType.ADD_SKILL_SUCCESS;
  constructor(public payload: Skill) {}
}

export class AddSkillFailed implements Action {
  readonly type = EmployeeActionType.ADD_SKILL_FAILED;
  constructor(public payload: string) {}
}

export class UpdateSkill implements Action {
  readonly type = EmployeeActionType.UPDATE_SKILL;
  constructor(public payload: Skill) {}
}

export class UpdateSkillSuccess implements Action {
  readonly type = EmployeeActionType.UPDATE_SKILL_SUCCESS;
  constructor(public payload: Skill) {}
}

export class UpdateSkillFailed implements Action {
  readonly type = EmployeeActionType.UPDATE_SKILL_FAILED;
  constructor(public payload: string) {}
}

export class DeleteSkill implements Action {
  readonly type = EmployeeActionType.DELETE_SKILL;
  constructor(public payload: Skill) {}
}

export class DeleteSkillSuccess implements Action {
  readonly type = EmployeeActionType.DELETE_SKILL_SUCCESS;
  constructor(public payload: Skill) {}
}

export class DeleteSkillFailed implements Action {
  readonly type = EmployeeActionType.DELETE_SKILL_FAILED;
  constructor(public payload: string) {}
}

export class GetNonWorkingHolidays implements Action {
  readonly type = EmployeeActionType.GET_NON_WORKING_HOLIDAYS;
}

export class GetNonWorkingHolidaysSuccess implements Action {
  readonly type = EmployeeActionType.GET_NON_WORKING_HOLIDAYS_SUCCESS;
  constructor(public payload: NonWorkingHoliday[]) {}
}

export class GetNonWorkingHolidaysFailed implements Action {
  readonly type = EmployeeActionType.GET_NON_WORKING_HOLIDAYS_FAILED;
  constructor(public payload: string) {}
}

export type EmployeeActions =
  | GetEmployee
  | GetEmployeeSuccess
  | GetEmployeeFailed
  | AddConference
  | AddConferenceFailed
  | AddConferenceSuccess
  | UpdateConference
  | UpdateConferenceSuccess
  | UpdateConferenceFailed
  | DeleteConference
  | DeleteConferenceSuccess
  | DeleteConferenceFailed
  | AddSkill
  | AddSkillFailed
  | AddSkillSuccess
  | UpdateSkill
  | UpdateSkillSuccess
  | UpdateSkillFailed
  | DeleteSkill
  | DeleteSkillSuccess
  | DeleteSkillFailed
  | GetNonWorkingHolidays
  | GetNonWorkingHolidaysSuccess
  | GetNonWorkingHolidaysFailed;

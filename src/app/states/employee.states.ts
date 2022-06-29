import { Conference } from '../models/conference.model';
import { Employee } from '../models/employee.model';
import { NonWorkingHoliday } from '../models/nonWorkingHoliday.model';
import { Skill } from '../models/skill.model';
export interface EmployeeState {
  employee: Employee;
  conferences: Conference[];
  skills: Skill[];
  holidays: NonWorkingHoliday[];
}

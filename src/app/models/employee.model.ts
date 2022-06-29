import { Skill } from './skill.model';
import { Project } from './project.model';
import { EmergencyContact } from './emergencyContact.model';
import { User } from './user.model';
import { Salary } from './salary.model';
import { BookRequest } from './bookRequest.model';
import { Conference } from './conference.model';

export class Employee {
  id?: number;
  firstName: string;
  lastName: string;
  title: string;
  manager?: Employee;
  phoneNumber: string;
  emergency_contact: EmergencyContact;
  birthday: Date;
  joinedDate: Date;
  salary: Salary;
  email: string;
  lastBonusReceived: Date;
  yearsInCA: number;
  user: User;
  project: Project;
  book_requests?: BookRequest[];
  dateLeft?: Date;
  employees?: Employee[]; // Array of employees which are being managed
  vacationDays: number;
  onVacation: boolean;
  usedVacationDays: number;
  skills?: Skill[];
  conferences: Conference[];
}

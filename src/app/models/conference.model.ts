import { Employee } from './employee.model';

export class Conference {
  id?: number;
  employee: Employee | number; // depends on if the employee is being populated, this might return an object or an integer (ID);
  conferenceType: string;
  dateAttended: Date;
  conferenceName: string;
  assignedBy: Employee;
  certification: string;
}

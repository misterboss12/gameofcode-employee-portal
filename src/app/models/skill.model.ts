import { Employee } from './employee.model';

export class Skill {
  id?: number;
  level: number;
  skillname: string;
  employee: Employee | number; // depends on if the employee is being populated, this might return an object or an integer (ID);
  description: String;
  created_at: Date;
}

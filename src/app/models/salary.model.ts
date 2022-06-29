import { Employee } from './employee.model';

export class Salary {
  id ?: number;
  employee?: Employee;
  employmentStatus?: string;
  contractExpiry?: Date;
  lastContractLength?: number;
  suggestedNewContractLength?: number;
  salaryBumpHistory: number;
  lastRaiseDate: Date;
  lastRaise: number;
  salary: number;
  suggestedRaise: number;
  final: number;
  amtInDollar?: number;
  comments?: string;
  created_at?: Date;
}

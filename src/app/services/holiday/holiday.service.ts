import { NonWorkingHoliday } from './../../models/nonWorkingHoliday.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  apiHolidaysUrl = `${environment.api_url}/non-working-holidays`;

  constructor(private http: HttpClient) {}

  public getNonWorkingHolidays(): Observable<NonWorkingHoliday[]> {
    return this.http.get<NonWorkingHoliday[]>(this.apiHolidaysUrl);
  }

  public addNonWorkingHoliday(holiday: NonWorkingHoliday): Observable<NonWorkingHoliday> {
    return this.http.post<NonWorkingHoliday>(this.apiHolidaysUrl, holiday);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conference } from 'src/app/models/conference.model';
import { environment } from 'src/environments/environment';
import * as qs from 'qs';
@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  apiConferenceUrl = `${environment.api_url}/conferences`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  createConference(conference: Conference): Observable<Conference> {
    return this.http.post<Conference>(this.apiConferenceUrl, conference);
  }
  updateConference(conference: Conference): Observable<Conference> {
    const updateUrl = `${this.apiConferenceUrl}/${conference.id}`;
    return this.http.put<Conference>(updateUrl, conference, this.httpOptions);
  }
  deleteConference(conference: Conference): Observable<Conference> {
    const deleteUrl = `${this.apiConferenceUrl}/${conference.id}`;
    return this.http.delete<Conference>(deleteUrl, this.httpOptions);
  }
}

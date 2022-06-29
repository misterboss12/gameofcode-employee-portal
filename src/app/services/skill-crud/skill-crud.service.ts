import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Skill } from '../../models/skill.model';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root',
})
export class SkillCrudService {
  private apiSkillsUrl = `${environment.api_url}/skills`;

  constructor(private http: HttpClient) {}

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiSkillsUrl);
  }
  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiSkillsUrl, skill);
  }
  editSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiSkillsUrl}/${skill.id}`, skill);
  }
  deleteSkill(skill: Skill): Observable<Skill> {
    return this.http.delete<Skill>(`${this.apiSkillsUrl}/${skill.id}`);
  }
}

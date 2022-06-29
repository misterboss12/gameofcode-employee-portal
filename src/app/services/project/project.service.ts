import { Project } from './../../models/project.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  apiProjectsUrl = `${environment.api_url}/projects/`;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}
  /** GET: retrieve all projects from server */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiProjectsUrl);
  }
  /** GET: retrieve project by ID from server */
  getProjectById(projectId: number){
    const projectByIdUrl = `${this.apiProjectsUrl}${projectId}`;
    return this.http.get<Project>(projectByIdUrl);
  }
  /** POST: add a new project to server */
  addProject(project: Project): Observable<Project>{
    return this.http.post<Project>(this.apiProjectsUrl, project, this.httpOptions);
  }
  /** PUT: update a project to server */
  updateProject(project: Project, projectId: number):Observable<Project>{
    const updateUrl = `${this.apiProjectsUrl}${projectId}`;
    return this.http.put<Project>(updateUrl, project, this.httpOptions);
  }
  /** DELETE: remove a project from server */
  deleteProject(project: Project):Observable<Project>{
    const id = typeof project === 'number' ? project : project.id;
    const deleteUrl = `${this.apiProjectsUrl}${id}`;
    return this.http.delete<Project>(deleteUrl, this.httpOptions);
  }
}

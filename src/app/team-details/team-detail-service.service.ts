import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailServiceService {

  constructor(private http: HttpClient) { }

  getTeamDetails() {
    return this.http.get('http://localhost:3000/teamdetails');
  }
  getEmployeeDetails(){
  return this.http.get('http://localhost:3000/employeedetails');
  }
  edit(requestBody: any) {
    return this.http.get('http://localhost:3000/edit');
  }

  save(requestBody: any) {
    return this.http.post('http://localhost:3000/teamdetails', requestBody);
  }

  saveForDetail(requestBody: any) {
    return this.http.post('http://localhost:3000/edit', requestBody);
  }

  delete(requestBody: any) {
    return this.http.delete('http://localhost:3000/teamdetails', requestBody);
  }

  saveAssetDetails(requestBody: any) {
    return this.http.post('http://localhost:3000/assetdetails', requestBody);
  }

  addAsset(teamId: string, newAsset: any, saveType?: any): Observable<any> {
    if (saveType == 'importSave') {
      return this.http.put(`${'http://localhost:3000/assetdetails'}/${teamId}`, { assets: newAsset });
    } else {
      return this.http.get(`${'http://localhost:3000/assetdetails'}/${teamId}`).pipe(
        map((response: any) => {
          const assets = response.assets || [];
          const existingIds = assets.map((asset: any) => asset.id);
          newAsset.id = this.generateUniqueId(existingIds);
          assets.push(newAsset);
          return this.http.put(`${'http://localhost:3000/assetdetails'}/${teamId}`, { assets });
        })
      );
    }
  }

  getAssetDetailById(id: string) {
    return this.http.get(`${'http://localhost:3000/assetdetails'}/${id}`);
  }
  
  getProjectDetailById(id: string) {
    return this.http.get(`${'http://localhost:3000/projectdetails'}/${id}`);
  }

  getProjectsById(teamId: string, projectId: string) {debugger
    return this.http.get(`${'http://localhost:3000/projectdetails'}/${teamId}`).pipe(
    map((result: any) => {
      return result.projects.filter((item: any) => item.id == projectId);
    }));
  }

  saveProjectDetails(requestBody: any) {
    return this.http.post('http://localhost:3000/projectdetails', requestBody);
  }

  getEmployeeDetailById(id: string) {
    return this.http.get(`${'http://localhost:3000/employeedetails'}/${id}`);
  }

  getEmployeeById(teamId: string, empId: string) {debugger
    return this.http.get(`${'http://localhost:3000/employeedetails'}/${teamId}`).pipe(
    map((result: any) => {
      return result.employees.filter((item: any) => item.id == empId);
    }));
  }

  saveEmployeeDetails(requestBody: any, recordId?: any) {
    return this.http.post('http://localhost:3000/employeedetails', requestBody);
  }

  addEmployee(teamId: string, newEmployee: any, saveType?:any): Observable<any> {
    if (saveType == 'importSave') {
      return this.http.put(`${'http://localhost:3000/employeedetails'}/${teamId}`, { employees: newEmployee });
    } else {
      return this.http.get(`${'http://localhost:3000/employeedetails'}/${teamId}`).pipe(
        map((response: any) => {
          const employees = response.employees || [];
          const existingIds = employees.map((emp: any) => emp.id);
          newEmployee.id = this.generateUniqueId(existingIds);
          employees.push(newEmployee);
          return this.http.put(`${'http://localhost:3000/employeedetails'}/${teamId}`, { employees });
        })
      );
    }
  }

  addProject(teamId: string, newProject: any, saveType?:any): Observable<any> {
    if (saveType == 'importSave') {
      return this.http.put(`${'http://localhost:3000/projectdetails'}/${teamId}`, { projects: newProject });
    } else {
      return this.http.get(`${'http://localhost:3000/projectdetails'}/${teamId}`).pipe(
        map((response: any) => {
          const projects = response.projects || [];
          const existingIds = projects.map((prj: any) => prj.id);
          newProject.id = this.generateUniqueId(existingIds);
          projects.push(newProject);
          return this.http.put(`${'http://localhost:3000/projectdetails'}/${teamId}`, { projects });
        })
      );
    }
  }
  
  private generateUniqueId(existingIds: string[]): string {
    let newId: string;
    do {
        newId = Math.random().toString(36).substr(2, 9);
    } while (existingIds.includes(newId));

    return newId;
  }

  deleteemployee(id: any) {
    return this.http.delete('http://localhost:3000/employeedetails/'+ id);
  }

  deleteProjects(id: any) {
    return this.http.delete('http://localhost:3000/projectdetails/'+ id);
  }

  deleteAssets(id: any) {
    return this.http.delete('http://localhost:3000/assetdetails/'+ id);
  }

  deleteTeamList(id: any) {
    return this.http.delete('http://localhost:3000/teamdetails/'+ id);
  }

  deleteEmployee(teamId: string, employeeId: string): Observable<any> {
    return this.http.get(`${'http://localhost:3000/employeedetails'}/${teamId}`).pipe(
      switchMap((response: any) => {
        let employees = response.employees || [];
        employees = employees.filter((emp: any) => emp.id !== employeeId);
        return this.http.put(`${'http://localhost:3000/employeedetails'}/${teamId}`, { employees });
      })
    );
  }

  deleteProject(teamId: string, projectId: string): Observable<any> {
    return this.http.get(`${'http://localhost:3000/projectdetails'}/${teamId}`).pipe(
      switchMap((response: any) => {
        let projects = response.projects || [];
        projects = projects.filter((prjct: any) => prjct.id !== projectId);
        return this.http.put(`${'http://localhost:3000/projectdetails'}/${teamId}`, { projects });
      })
    );
  }

  deleteAsset(teamId: string, assetId: string): Observable<any> {
    return this.http.get(`${'http://localhost:3000/assetdetails'}/${teamId}`).pipe(
      switchMap((response: any) => {
        let assets = response.assets || [];
        assets = assets.filter((asset: any) => asset.id !== assetId);
        return this.http.put(`${'http://localhost:3000/assetdetails'}/${teamId}`, { assets });
      })
    );
  }
}

interface Project {
  id: string;
  profile: string;
  voice: string;
  developer: string;
  state: boolean;
  parent: string;
  client: string;
  mail: string;
  password: string;
  manager: string;
  contact: string;
  joining: string;
  relieving: string | null;
}

interface ProjectDetail {
  id: string;
  projects: Project[];
}

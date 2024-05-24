import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailServiceService {

  constructor(private http: HttpClient) { }

  getTeamDetails() {
    return this.http.get('http://localhost:3000/teamdetails');
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

  getAssetDetails() {
    return this.http.get('http://localhost:3000/assetdetails');
  }

  getProjectDetails() {
    return this.http.get('http://localhost:3000/projectdetails');
  }

  saveProjectDetails(requestBody: any) {
    return this.http.post('http://localhost:3000/projectdetails', requestBody);
  }

  getEmployeeDetails() {
    return this.http.get('http://localhost:3000/employeedetails');
  }

  saveEmployeeDetails(requestBody: any, recordId: any) {
    if (recordId == 0) {
      return this.http.post('http://localhost:3000/employeedetails', requestBody);
    } else {
      // requestBody = { ...requestBody, ...{ id: recordId} };
      return this.http.put('http://localhost:3000/employeedetails/'+recordId, requestBody);
    }
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
}

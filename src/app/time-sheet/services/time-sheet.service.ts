import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  constructor(private http: HttpClient) { }

  getTimesheetData() {
    return this.http.get('http://localhost:4000/timesheet');
  }

  saveTimesheetData(data: any, empId: any) {
    return this.http.put(`${'http://localhost:4000/timesheet'}/${empId}`, data);
  }
}

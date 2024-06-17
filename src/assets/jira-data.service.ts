import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Row } from 'devextreme/ui/data_grid';
// import { Row } from './jira-page.component';

@Injectable({
  providedIn: 'root'
})
export class JiraDataService {
  private optionsUrl = 'http://localhost:3000/teamdetails';  
  private jiraDetailsUrl = 'http://localhost:5402/jiradetails';

  // rows$ = this.rowsSubject.asObservable();

  constructor(private http: HttpClient) { }
  getOptions(): Observable<string[]> {
    return this.http.get<string[]>(this.optionsUrl);
  }

  saveJira(req: any) {
    return this.http.post('http://localhost:5402/jiradetails', req);
  }

  getJiradetails() {
    return this.http.get<any[]>(this.jiraDetailsUrl);
  }

  // private loadData() {
  //   this.http.get<Row[]>(this.dataUrl).subscribe(data => {
  //     this.rowsSubject.next(data);
  //   });
  // }

  // addRow(newRow: Row) {
  //   const currentRows = this.rowsSubject.getValue();
  //   this.rowsSubject.next([...currentRows, newRow]);
  // }

  // saveData(value: any) {debugger
  //   const data = this.rowsSubject.getValue();
  //   const jsonData = JSON.stringify(data);
  //   this.http.post('http://localhost:5400/jiradetails',value).subscribe()
  // }
  // save(requestBody: any) {
  //   return this.http.post('http://localhost:3000/teamdetails', requestBody);
  // }

}

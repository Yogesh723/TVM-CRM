import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Row {
  sno?: number;
  date: string;
  team: string;
  employeeName: string;
  taskDetails: string;
  status: string;
  scrumTiming: string;
  morningSession: string;
  middaySession: string;
  afternoonSession: string;
  eveningSession: string;
  nonBillableHrs: string;
  nonBillableStatus: string;
  dailyScore: string;
  comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class JiraDataService {
  private dataUrl = 'assets/data.json';

  private rowsSubject = new BehaviorSubject<Row[]>([]);
  rows$ = this.rowsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getData(): Observable<Row[]> {
    return this.http.get<Row[]>(this.dataUrl);
  }

  getRows() {
    return this.rowsSubject.value;
  }

  addRow(row: Row) {
    const currentRows = this.getRows();
    this.rowsSubject.next([...currentRows, row]);
  }
}

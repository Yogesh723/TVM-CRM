import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreadcrumbService } from '../bread-crumb/bread-crumb.service';
import { Router } from '@angular/router';

interface Row {
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
  [key: string]: string;
}

@Component({
  selector: 'app-jira-page',
  templateUrl: './jira-page.component.html',
  styleUrls: ['./jira-page.component.scss']
})
export class JiraPageComponent implements OnInit { 
  rows: Row[] = [
    {
      team: 'Team A',
      employeeName: 'Bala',
      taskDetails: 'Task 1',
      status: 'Completed',
      scrumTiming: '9:00 AM',
      morningSession: 'Working',
      middaySession: 'Meeting',
      afternoonSession: 'Development',
      eveningSession: 'Review',
      nonBillableHrs: '1.5',
      nonBillableStatus: 'Meeting',
      dailyScore: '8',
      comments: 'Good progress'
    }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private route: Router,
    private breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs([
      { active: 'JIRA'},
      { label: 'Home', url: '/' },
      { label: 'JIRA', url: '/jira' },
      { label: 'JIRA Page', url: this.route.url }
    ]);
  }

  addRow(): void {
    this.rows.push({
      team: '',
      employeeName: '',
      taskDetails: '',
      status: '',
      scrumTiming: '',
      morningSession: '',
      middaySession: '',
      afternoonSession: '',
      eveningSession: '',
      nonBillableHrs: '',
      nonBillableStatus: '',
      dailyScore: '',
      comments: ''
    });
    this.cdr.detectChanges();
  }

  addNewRow(event: any, index: number): void {
    if (event.key === 'Enter' && index === this.rows.length - 1) {
      this.addRow();
    }
  }
}

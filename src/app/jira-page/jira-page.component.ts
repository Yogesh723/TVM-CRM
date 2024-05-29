import { ChangeDetectorRef, Component, ViewChild, EventEmitter, OnInit, Output } from '@angular/core';
import { BreadcrumbService } from '../bread-crumb/bread-crumb.service';
import { Router } from '@angular/router';
import { JiraDataService } from 'src/assets/jira-data.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { InitNewRowEvent, RowRemovingEvent, SavingEvent, SavedEvent } from 'devextreme/ui/data_grid';
interface Row {
  sno?: number;
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


@Component({
  selector: 'app-jira-page',
  templateUrl: './jira-page.component.html',
  styleUrls: ['./jira-page.component.scss']
})
export class JiraPageComponent implements OnInit {


  generateSno(): number {
    return this.rows.length + 1;
  }

  rows: Row[] = [];
  showFilterRow!: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: Router,
    private breadcrumbService: BreadcrumbService,
    private jiradataservice:JiraDataService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Home', url: '/' },
      { label: 'JIRA', url: '/jira' },
      { label: 'JIRA Page', url: this.route.url }
    ]);

    this.jiradataservice.rows$.subscribe(rows => {debugger
      this.rows = rows;
    });
  }

  addRow(): void {
    const sno = this.generateSno();
    this.rows.push({
      sno:sno,
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

  handleEditCanceled(event: any) {
    console.log("Editing canceled.");
  }
  handleEditorPreparing(event: any) {
    console.log("Editing canceled.");
  }
  handleRowUpdated(event: any) {
    console.log("Editing canceled.");
  }

  handleInitNewRow($event: any) {
    console.log("Editing canceled.");
    } 
    handleRowRemoving($event: RowRemovingEvent) {
      console.log("Editing canceled.");
      }
      handleSaving($event: SavingEvent) {
        console.log("Editing canceled.");
      }
      handleSaved($event: SavedEvent) {
        console.log("Editing canceled.");
      }
      saveIconFilterState() {
        console.log("Editing canceled.");
      }


  multiGroupDisplay(data: any) {
    return data.value;
  }

  toggleFilterRow(): void {
    this.showFilterRow = !this.showFilterRow;
  }
  navigateToAddRow(): void {
    this.route.navigate(['tvm/team/add-row']);
  }

  addNewRow(event: any, index: number): void {
    if (event.key === 'Enter' && index === this.rows.length - 1) {
      this.addRow();
    }
  }

  addRows() {
    this.route.navigate(['tvm/team//add-row']);
  }
  
}

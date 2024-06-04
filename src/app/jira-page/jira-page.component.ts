import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../bread-crumb/bread-crumb.service';
import { Router } from '@angular/router';
import { TeamDetailServiceService } from '../team-details/team-detail-service.service';

@Component({
  selector: 'app-jira-page',
  templateUrl: './jira-page.component.html',
  styleUrls: ['./jira-page.component.scss']
})
export class JiraPageComponent implements OnInit {
  selectedDate: Date | null = null;

  selectedValues: string[] = [];
  options: string[] = [];
  allSelected: boolean = false;
  rows: any[] = [];
  filteredRows: any[] = [];
  showFilterRow!: boolean;
  showGrid: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: Router,
    private breadcrumbService: BreadcrumbService,
    private teamdetailsservice: TeamDetailServiceService
  ) {}

  ngOnInit(): void {
    this.fetchOptionsAndRows();
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Home', url: '/' },
      { label: 'JIRA', url: '/jira' },
      { label: 'JIRA Page', url: this.route.url }
    ]);
  }

  fetchOptionsAndRows(): void {
    this.teamdetailsservice.getOptions().subscribe((options: any[]) => {
      this.options = options.map((e: any) => e.TeamName);
      this.cdr.detectChanges();
    });

    this.teamdetailsservice.getJiradetails().subscribe((rows: any[]) => {
      this.rows = rows;
      this.cdr.detectChanges();
    });
  }
  toggleSelectAll(event: any) {
    if (event.value === 'selectAll') {
        this.allSelected = event.source.selected;
        if (this.allSelected) {
            this.selectedValues = [...this.options];
        } else {
            this.selectedValues = [];
        }
    } else {
        const index = this.selectedValues.indexOf('selectAll');
        if (index !== -1) {
            this.selectedValues.splice(index, 1);
        }

        if (!this.selectedValues.includes('selectAll') && this.selectedValues.length === this.options.length) {
            this.allSelected = true;
            this.selectedValues.push('selectAll');
        } else {
            this.allSelected = false;
        }
    }
    this.filterRows();
}


searchData() {
  this.filterRows();
}
  onSelectionChange(event: any) {
    if (event.value.includes('selectAll')) {
      this.toggleSelectAll(event);
    } else {
      this.selectedValues = event.value;
      this.allSelected = this.selectedValues.length === this.options.length;
      this.filterRows();
    }
  }

  filterRows() {
    // Filter rows based on selected team name(s) and exact date match
    this.filteredRows = this.rows.filter(row => {
      const teamMatch = this.selectedValues.length === 0 || this.selectedValues.includes(row.team);
      const dateMatch = !this.selectedDate || this.isSameDate(new Date(row.date), this.selectedDate);
      return teamMatch && dateMatch;
    });
  
    // Show the grid if data is found
    this.showGrid = this.filteredRows.length > 0;
  }
  
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
  

  addRow(): void {
    const sno = this.generateSno();
    this.rows.push({
      sno: sno,
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

  generateSno(): number {
    if (this.rows.length === 0) {
      return 1;
    }
    const maxSno = Math.max(...this.rows.map(row => row.sno));
    return maxSno + 1;
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

  handleRowRemoving($event: any) {
    console.log("Editing canceled.");
  }

  handleSaving($event: any) {
    console.log("Editing canceled.");
  }

  handleSaved($event: any) {
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
    this.route.navigate(['tvm/team/add-row']);
  }
  
}

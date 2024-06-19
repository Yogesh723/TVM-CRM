import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbService } from '../bread-crumb/bread-crumb.service';
import { Router } from '@angular/router';
import { TeamDetailServiceService } from '../team-details/team-detail-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { JiraDataService } from 'src/assets/jira-data.service';

@Component({
  selector: 'app-jira-page',
  templateUrl: './jira-page.component.html',
  styleUrls: ['./jira-page.component.scss']
})
export class JiraPageComponent implements OnInit {
  selectedDate: Date | null = null;
  searchUserForm!: FormGroup;
  selectedValues: string[] = [];
  options: any = [];
  allSelected: boolean = false;
  rows: any[] = [];
  filteredRows: any[] = [];
  showFilterRow!: boolean;
  showGrid: boolean = false;
  showDefaultText: boolean = true;
  userTypeFilters = [];
  @ViewChild('allSelecteds') private allSelecteds!: MatOption;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: Router,
    private breadcrumbService: BreadcrumbService,

    private jirapageservice : JiraDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchOptionsAndRows();
    this.breadcrumbService.setBreadcrumbs([
      { active: 'JIRA Page'},
      { label: 'Home', url: '/' },
      { label: 'JIRA', url: '/jira' },
      { label: 'JIRA Page', url: this.route.url }
    ]);

    // this.jiradataservice.rows$.subscribe(rows => {
    //   this.rows = rows;
    // });
    this.searchUserForm = this.fb.group({
      userType: new FormControl('')
    });
  }

  fetchOptionsAndRows(): void {
    this.jirapageservice.getOptions().subscribe((options: any[]) => {
      this.options = options;
      this.cdr.detectChanges();
    });

    this.jirapageservice.getJiradetails().subscribe((rows: any[]) => {
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
  }

  onSelectionChange(event: any) {
    if (event.value.includes('selectAll')) {
      this.toggleSelectAll(event);
    } else {
      this.selectedValues = event.value;
      this.allSelected = this.selectedValues.length === this.options.length;
    }
  }

  tosslePerOne(all: any){ 
    if (this.allSelecteds.selected) {  
      this.allSelecteds.deselect();
      this.allSelected = false;
      return false;
    }
    if(this.searchUserForm.controls['userType'].value.length == this.userTypeFilters.length)
      this.allSelecteds.select();
    return true;
  }

  toggleAllSelection() {
    if (this.allSelecteds.selected) {
      this.searchUserForm.controls['userType']
        .patchValue([...this.options.map((item: any) => item.TeamName), 0]);
    } else {
      this.searchUserForm.controls['userType'].patchValue([]);
    }
  }

  searchData() {
    this.filterRows();
    this.showDefaultText = false;
  }
  
  filterRows() {
    this.filteredRows = this.rows.filter(row => {
      const teamMatch = this.selectedValues.length === 0 || this.selectedValues.includes(row.team);
      const dateMatch = !this.selectedDate || this.isSameDate(new Date(row.year, this.getMonthNumber(row.month) - 1, row.date), this.selectedDate);
      return teamMatch && dateMatch;
    });
  
    this.showGrid = this.filteredRows.length > 0;
  }
  
  isSameDate(date1: Date, date2: Date | string | null | undefined): boolean {
    if (date2 instanceof Date === false && typeof date2 === 'string') {
      date2 = new Date(date2);
    }
    if (!(date2 instanceof Date && !isNaN(date2.getTime()))) {
      return false; 
    }
  
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
  
  
  
  getMonthNumber(monthName: string): number {
    const months: { [key: string]: number } = {
      'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'Jun': 6,
      'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
    };
    return months[monthName as keyof typeof months];
  }
  
  
  
  
  getMonthIndex(month: string): number {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(month);
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

import { Component } from '@angular/core';
import { TeamDetailServiceService } from '../../team-detail-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommunicationService } from 'src/app/common/communication.service';
import { DatePipe } from '@angular/common';
import { BreadcrumbService } from 'src/app/bread-crumb/bread-crumb.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.scss']
})
export class EmployeesDetailsComponent {
  employeeColumns: any = []
  employeeListInfo: any = [];
  listObservable: any;
  activeId: any = '';

  constructor(
    private communicationService: CommunicationService,
    private teamService: TeamDetailServiceService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private breadcrumbService: BreadcrumbService,
  ) {

  }

  ngOnInit(): void {
    this.activeId = this.activeRoute.snapshot.paramMap.get('teamId');
    this.communicationService.confirmActiveId(this.activeId);
    this.communicationService.confirmActiveSection('Employees');
    this.getAssets();
    this.employeeColumns = [
      {
        "name": "Employee",
        "label": "Employee Name",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "joining",
        "label": "Date of Joining",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "Experienceyear",
        "label": "Year of Experience",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "Specifications",
        "label": "Specifications",
        "widthPct": 10,
        "hidden": false
      }
    ];
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Home', url: '/' },
      { label: 'Employee', url: '/Employee' },
      { label: 'Employee Details', url: this.route.url }
    ]);
  }
  getAssets() {
    this.teamService.getEmployeeDetailById(this.activeId).subscribe((result: any) => {
      this.employeeListInfo = result.employees;
      this.employeeListInfo.forEach((element: any) => {
        element.state = element.state == true ? 'Yes' : 'No';
        element.joining = new DatePipe('en-US').transform(element.joining, 'MM/dd/yyyy');
      });
      this.listObservable = new BehaviorSubject(this.employeeListInfo);    });
  }

  addNew(id: any) {
    let path = this.route.routerState.snapshot.url;
    this.route.navigateByUrl(path+'/'+id);
    this.communicationService.goBackClick(false);
  }

  rowClicked(id: any) {
    this.addNew(id);
  }

  delete(id: any) {
    this.teamService.deleteEmployee(this.activeId, id).subscribe((res: any) => {
      this.getAssets();
    });
  }
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employeeListInfo);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'employee_details');
  }

  saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = `${fileName}_${new Date().getTime()}.xlsx`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}

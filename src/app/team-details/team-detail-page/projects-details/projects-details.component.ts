import { Component } from '@angular/core';
import { TeamDetailServiceService } from '../../team-detail-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CommunicationService } from 'src/app/common/communication.service';
import { BreadcrumbService } from 'src/app/bread-crumb/bread-crumb.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss']
})
export class ProjectsDetailsComponent {
  projectColumns: any = []
  projectListInfo: any = [];
  listObservable: any;

  constructor(
    private communicationService: CommunicationService,
    private teamService: TeamDetailServiceService,
    private route: Router,
    private breadcrumbService: BreadcrumbService
  ) {

  }

  ngOnInit(): void {
    this.communicationService.confirmActiveSection('Projects');
    this.getAssets();
    this.projectColumns = [
      {
        "name": "profile",
        "label": "Profile",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "voice",
        "label": "Voice",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "developer",
        "label": "Developer",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "state",
        "label": "Active",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "joining",
        "label": "Joining Date",
        "widthPct": 10,
        "hidden": false 
      },
      {
        "name": "manager",
        "label": "Reporting Manager",
        "widthPct": 10,
        "hidden": false 
      }
    ];
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Home', url: '/' },
      { label: 'Team Details', url: '/tvm/team/teamlist' },
      { label: 'Project Details', url: this.route.url }
    ]);
  }
  getAssets() {
    this.teamService.getProjectDetails().subscribe((result: any) => {
      this.projectListInfo = result;
      this.projectListInfo.forEach((element: any) => {
        element.state = element.state == true ? 'Yes' : 'No';
        element.joining = new DatePipe('en-US').transform(element.joining, 'MM/dd/yyyy');
      });
      this.listObservable = new BehaviorSubject(this.projectListInfo);
    });
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
    this.teamService.deleteProjects(id).subscribe((res: any) => {
      this.getAssets();
    })
  }
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.projectListInfo);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'project_details');
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

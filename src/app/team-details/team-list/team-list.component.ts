import { Component, OnInit } from '@angular/core';
import { TeamDetailServiceService } from '../team-detail-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommunicationService } from 'src/app/common/communication.service';
import { BreadcrumbService } from 'src/app/bread-crumb/bread-crumb.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  listColumns: any = []
  listInfo: any = [];
  listObservable: any;
  selectedMenuItem: string = 'Teams';
  subSideNav: any = [];

  constructor(
    private communicationService: CommunicationService,
    private detailService: TeamDetailServiceService,
    private route: Router,
    private breadcrumbService: BreadcrumbService

  ) {}

  ngOnInit() {
    this.getTeamdetails();
    this.listColumns = [
      {
        "name": "TeamName",
        "label": "Team Name",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "LeadName",
        "label": "Lead Name",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "TeamSize",
        "label": "Team Size",
        "widthPct": 10,
        "hidden": false
      }
    ];
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Home', url: '/' },
      { label: 'Team Details', url: this.route.url }
    ]);
  }

  getTeamdetails() {
    this.detailService.getTeamDetails().subscribe((result: any) => {
      this.listInfo = result;
      this.listObservable = new BehaviorSubject(this.listInfo);
    });
  }

  add(id: any) {
    let path;
    if (id == 0) {
      path = 'tvm/team/teamdetail/' + id;
    } else {
      path = 'tvm/team/teamdetail/' + id + '/Asset';
    }
    this.route.navigateByUrl(path);
    this.communicationService.goBackClick(false);
  }

 delete(id: any) {
    this.detailService.deleteTeamList(id).subscribe((res: any) => {
      this.getTeamdetails();
    })
  }
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listInfo);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'team_details');
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

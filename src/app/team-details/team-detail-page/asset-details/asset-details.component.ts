import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { TeamDetailServiceService } from '../../team-detail-service.service';
import { CommunicationService } from 'src/app/common/communication.service';
import { BreadcrumbService } from 'src/app/bread-crumb/bread-crumb.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit{

  listColumns: any = []
  listInfo: any = [];
  listObservable: any;
  activeId: any = '';

  constructor(
    private communicationService: CommunicationService,
    private teamService: TeamDetailServiceService,
    private breadcrumbService: BreadcrumbService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.activeId = this.activeRoute.snapshot.paramMap.get('teamId');
    this.communicationService.confirmActiveId(this.activeId);
    this.communicationService.confirmActiveSection('Asset');
    this.getAssets();
    this.listColumns = [
      {
        "name": "profileName",
        "label": "Profile Name",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "laptop",
        "label": "Laptop",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "charger",
        "label": "Charger",
        "widthPct": 10,
        "hidden": false
      }
    ];
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Home', url: '/' },
      { label: 'Team Details', url: '/assets' },
      { label: 'Asset Details', url: this.route.url }
    ]);
  }
  getAssets() {
    this.teamService.getAssetDetailById(this.activeId).subscribe((result: any) => {
      this.listInfo = result.assets;
      this.listObservable = new BehaviorSubject(this.listInfo);
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
    this.teamService.deleteAsset(this.activeId, id).subscribe((res: any) => {
      this.getAssets();
    });
  }
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listInfo);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'asset_details');
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

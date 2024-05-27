import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { TeamDetailServiceService } from '../../team-detail-service.service';
import { CommunicationService } from 'src/app/common/communication.service';
import { BreadcrumbService } from 'src/app/bread-crumb/bread-crumb.service';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit{

  listColumns: any = []
  listInfo: any = [];
  listObservable: any;

  constructor(
    private communicationService: CommunicationService,
    private teamService: TeamDetailServiceService,
    private route: Router,
    private breadcrumbService: BreadcrumbService
  ) {

  }

  ngOnInit(): void {
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
      { label: 'Assets', url: '/assets' },
      { label: 'Asset Details', url: this.route.url }
    ]);
  }
  getAssets() {
    this.teamService.getAssetDetails().subscribe((result: any) => {
      this.listInfo = result;
      this.listObservable = new BehaviorSubject(this.listInfo);
    })
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
    this.teamService.deleteAssets(id).subscribe((res: any) => {
      this.getAssets();
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  activeId: any = '';
  acceptRole: any = [];

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
      { active: 'Asset Details'},
      { label: 'Home', url: '/' },
      { label: 'Team Details', url: '/tvm/team/teamlist' },
      { label: 'Asset Details', url: this.route.url }
    ]);
    let data  : any= localStorage.getItem('credentials')
    const userData = JSON.parse(data);
      if(userData.Role == "A"){
        this.acceptRole.push("A");
      } else if(userData.Role == "L"){
        this.acceptRole.push("L");
      } else {
        this.acceptRole.push("");
      }
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

  saveImorteddetails(event: any) {
    this.teamService.addAsset(this.activeId, event, 'importSave').subscribe((result: any) => {
      let url: string = this.route.routerState.snapshot.url;
      let modifiedUrl: string = url.slice(0, url.lastIndexOf('/0'));
      this.route.navigateByUrl(modifiedUrl);
    });
  }
}

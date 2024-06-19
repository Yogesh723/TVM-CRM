import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDetailServiceService } from 'src/app/team-details/team-detail-service.service';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.scss']
})
export class EditAssetComponent implements OnInit {
  Pageheader = 'Add New Asset';
  formObject = {
    General: [
      {
        name: "profileName",
        label: "Name",
        type: "singleSelect",
        width: '75%',
        pickList: [ ]
      },
      {
        name: "laptop",
        label: "Laptop"
      },
      {
        name: "charger",
        label: "Charger"
      },
      // {
      //   name: 'lapImg',
      //   label: 'Laptop Image',
      //   type: 'image'
      // }
    ]
  };
  teamId: any = 0;

  constructor(
    private teamService: TeamDetailServiceService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.teamId = this.activeRoute.snapshot.paramMap.get('teamId');
    this.teamService.getProjectDetailById(this.teamId).subscribe((result: any) => {
      this.formObject.General.forEach((element: any) => {
        if (element.type == 'singleSelect') {
          element.pickList = result.projects.map((i: any, index: any) => { return {"label": i.profile, "value": index} });
          element.pickList = [
            {'label': 'Add a New Project', 'value': -1},
            ...element.pickList
          ]
        }
      });
    });
  }

  selectionChange(event: any) {
    if (event.value == -1) {
      this.route.navigateByUrl('tvm/team/teamdetail/Projects/' + this.teamId + '/0')
    }
  }

  save(formValue: any) {
    this.teamService.addAsset(this.teamId, formValue).subscribe((result: any) => {
      result.subscribe((res: any) => {
        let url: string = this.route.routerState.snapshot.url;
        let modifiedUrl: string = url.slice(0, url.lastIndexOf('/0'));
        this.route.navigateByUrl(modifiedUrl);
      }); 
    });
  }
}

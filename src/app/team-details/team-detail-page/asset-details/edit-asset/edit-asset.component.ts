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
        label: "Profile Name"
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      {
        name: 'lapImg',
        label: 'Laptop Image',
        type: 'image'
      }
    ]
  };

  constructor(
    private teamService: TeamDetailServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    
  }

  save(formValue: any) {
    this.teamService.saveAssetDetails(formValue).subscribe((result: any) => {
      let url: string = this.route.routerState.snapshot.url;
      let modifiedUrl: string = url.slice(0, url.lastIndexOf('/0'));
      this.route.navigateByUrl(modifiedUrl);
    });
  }
}

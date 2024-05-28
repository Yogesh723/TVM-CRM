import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGeneratorComponent } from 'src/app/common/form-generator/form-generator.component';
import { TeamDetailServiceService } from 'src/app/team-details/team-detail-service.service';

@Component({
  selector: 'app-edit-project-details',
  templateUrl: './edit-project-details.component.html',
  styleUrl: './edit-project-details.component.scss'
})
export class EditProjectDetailsComponent implements OnInit {
  Pageheader = 'Add New Project';
  projectDetails: any;
  formObject = {
    General: [
      {
        name: "profile",
        label: "Profile",
        type: "String",
        readonlyProp: true
      },
      {
        name: "voice",
        label: "Voice",
        type: "String"
      },
      {
        name: "developer",
        label: "Developer",
        type: "String"
      },
      {
        name: "state",
        label: "Active/Inactive",
        type: "Toggle",
        value: false
      },
      {
        name: "parent",
        label: "Parent Company",
        type: "String",
        readonlyProp: true
      },
      {
        name: "client",
        label: "Client Company",
        type: "String",
        readonlyProp: true
      },
      {
        name: "mail",
        label: "Mail",
        type: "String"
      },
      {
        name: "password",
        label: "Password",
        type: "String"
      },
      {
        name: "manager",
        label: "Reporting manager",
        type: "String"
      },
      {
        name: "contact",
        label: "Contact Number",
        type: "number"
      },
      {
        name: "joining",
        label: "Joining Date",
        type: "Date",
        readonly: false
      },
      {
        name: "relieving",
        label: "Relieving date",
        type: "Date",
        readonly: false
      },
    ]
  };
  activeId: any = 0;
  teamId: any = 0;

  @ViewChild(FormGeneratorComponent, { static: true }) formGenerationComponent!: FormGeneratorComponent;

  constructor(
    private teamService: TeamDetailServiceService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activeId = this.activeRoute.snapshot.paramMap.get('prcjtId');
    this.teamId = this.activeRoute.snapshot.paramMap.get('teamId');

    if (this.activeId != 0) {
      this.getProjectDetail();
    } else {
      this.projectDetails = this.formObject;
    }
  }

  getProjectDetail() {
    this.teamService.getProjectsById(this.teamId, this.activeId).forEach((result: any) => {debugger
      // let res = result.filter((e: any) => e.id == this.activeId)[0];
      for (const section in result[0]) {
        if (section !== 'id')
        this.formObject.General.map((element: any) => {
          let ele = result[0][section];
          if (element.name == section) {
            if (element.type == 'Date') {
              let datePipe: DatePipe = new DatePipe('en-US');
              ele = datePipe.transform(ele, 'MM/dd/yyyy');
              element.readonly = true;
            }
            if (element.readonlyProp === true) {
              element.readonly = true;
            }
            element.value = ele;
          }
        });
      }
      this.projectDetails = this.formObject;
    });
  }

  formGenerated(event: any) {
    this.formGenerationComponent.appForm.controls['state'].valueChanges.subscribe((res: any) => {
      this.projectDetails.General.map((e: any) => {
        if(e.name == 'relieving') {
          if (res == true) {
            e.hidden = true;
            this.formGenerationComponent.appForm.controls[e.name].setErrors(null);
          } else {
            e.hidden = false;
          }
        }
      })
    });
  }

  save(formValue: any) {
    this.teamService.addProject(this.teamId, formValue).subscribe((result: any) => {
      result.subscribe((res: any) => {
        let url: string = this.route.routerState.snapshot.url;
        let modifiedUrl: string = url.slice(0, url.lastIndexOf('/0'));
        this.route.navigateByUrl(modifiedUrl);
      });
    });
  }

}

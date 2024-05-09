import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGeneratorComponent } from 'src/app/common/form-generator/form-generator.component';
import { TeamDetailServiceService } from 'src/app/team-details/team-detail-service.service';
@Component({
  selector: 'app-edit-employee-details',
  templateUrl: './edit-employee-details.component.html',
  styleUrl: './edit-employee-details.component.scss'
})
export class EditEmployeeDetailsComponent {
  Pageheader = 'Edit Employee Details';
  projectDetails: any;
  formObject = {
    General: [
      {
        "name": "Employee",
        "label": "Employee Name",
        type: "String"
      },
      {
        "name": "JoiningDate",
        "label": "Date of Joining",
        type: "Date",
        readonly: false
      },
      {
        "name": "Experienceyear",
        "label": "Year of Experience",
        type: "String"
      },
      {
        "name": "Specifications",
        "label": "Specifications",
        type: "String"
      },
    ]
  };
  activeId: any = 0;
  @ViewChild(FormGeneratorComponent, { static: true }) formGenerationComponent!: FormGeneratorComponent;

  constructor(
    private teamService: TeamDetailServiceService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activeId = this.activeRoute.snapshot.paramMap.get('id');
    this.getEmployeeDetail();
  }

  getEmployeeDetail() {
    this.teamService.getEmployeeDetails().subscribe((result: any) => {
      let res = result.filter((e: any) => e.id == this.activeId)[0];
      for (const section in res) {
        this.formObject.General.map((element: any) => {
          let ele = res[section];
          if (element.name == section) {
            if (element.type == 'Date') {
              let datePipe: DatePipe = new DatePipe('en-US');
              ele = datePipe.transform(ele, 'MM/dd/yyyy');
            }
            element.value = ele;
          }
        });
      }
      this.projectDetails = this.formObject;
    });
  }

  formGenerated(event: any) {
    // this.formGenerationComponent.appForm.controls['state'].valueChanges.subscribe((res: any) => {
    //   if (res == true) {
    //     this.formGenerationComponent.appForm.controls['relieving'];
    //   }
    // });
  }

  save(formValue: any) {
    this.teamService.saveEmployeeDetails(formValue).subscribe((result: any) => {
      let url: string = this.route.routerState.snapshot.url;
      let modifiedUrl: string = url.slice(0, url.lastIndexOf('/0'));
      this.route.navigateByUrl(modifiedUrl);
    });
  }

}

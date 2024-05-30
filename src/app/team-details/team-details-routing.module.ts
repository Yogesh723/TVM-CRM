import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailPageComponent } from './team-detail-page/team-detail-page.component';
import { AssetDetailsComponent } from './team-detail-page/asset-details/asset-details.component';
import { ProjectsDetailsComponent } from './team-detail-page/projects-details/projects-details.component';
import { EmployeesDetailsComponent } from './team-detail-page/employees-details/employees-details.component';
import { EditAssetComponent } from './team-detail-page/asset-details/edit-asset/edit-asset.component';
import { EditProjectDetailsComponent } from './team-detail-page/projects-details/edit-project-details/edit-project-details.component';
import { EditEmployeeDetailsComponent } from './team-detail-page/employees-details/edit-employee-details/edit-employee-details.component';
import { MaintenanceComponent } from '../maintenance/maintenance.component';
import { JiraPageComponent } from '../jira-page/jira-page.component';
import { TeamDetailsMaintenanceComponent } from './team-detail-page/team-details-maintenance/team-details-maintenance.component';
import { AddRowComponent } from 'src/add-row/add-row.component';
const routes: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
    children: [
      {
        path: 'teamlist',
        children: [
          {
            path: '',
            component: TeamListComponent
          },
          {
            path: ':id',
            component: TeamDetailPageComponent,
          }
        ]
      },
      {
        path: 'jira-page',
        component:JiraPageComponent
      },
      { 
        path: 'add-row', 
        component: AddRowComponent
      }
    ]
  },
  {
    path: 'teamdetail',
    component: TeamDetailsMaintenanceComponent,
    children: [
      {
        path: 'Asset/:teamId',
        component: AssetDetailsComponent
      },
      {
        path: 'Projects/:teamId',
        component: ProjectsDetailsComponent
      },
      {
        path: 'Employees/:teamId',
        component: EmployeesDetailsComponent
      },
      {
        path: 'time-sheet/:teamId',
        loadChildren: () => import('../time-sheet/time-sheet.module').then(m => m.TimeSheetModule)
      },
      {
        path: 'Asset/:teamId/:aasetId',
        component: EditAssetComponent
      },
      {
        path: 'Projects/:teamId/:prcjtId',
        component: EditProjectDetailsComponent
      },
      {
        path: 'Employees/:teamId/:empId',
        component: EditEmployeeDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamDetailsRoutingModule { }

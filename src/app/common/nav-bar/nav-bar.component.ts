import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NavigationServiceService } from '../services/navigation-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() topNavMenu: any = [];
  @ViewChild('employeeDialog') employeeDialog!: TemplateRef<any>;

  employee = {
    name: 'Profile_Name',
    position: 'Profile_Position',
    department: 'Profile_Department'
  };

  constructor(
    private navService: NavigationServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(){    
  }

  goBack(event: any) {
    this.navService.back();
  }

  viewProfile(){
    this.dialog.open(this.employeeDialog, {
      width: '250px',
      data: this.employee
    });
  }

  logout() {
    this.router.navigate(['/']);
  }
}

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
  userData:any;
  profileType:any;
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
    let data  : any= localStorage.getItem('credentials')
    this.userData = JSON.parse(data);
    if(this.userData.Role == "A"){
      this.profileType = "Admin"
    } else if(this.userData.Role == "L"){
      this.profileType = "Lead"
    } else if(this.userData.Role == "E"){
      this.profileType = "Employee"
    } else {
      this.profileType = "User"
    }
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

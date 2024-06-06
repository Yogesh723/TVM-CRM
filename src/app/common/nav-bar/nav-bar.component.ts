import { Component, Input } from '@angular/core';
import { NavigationServiceService } from '../services/navigation-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() topNavMenu: any = [];

  constructor(
    private navService: NavigationServiceService,
    private router: Router
  ) {

  }

  goBack(event: any) {
    this.navService.back();
  }

  user = {
    name: 'John Doe',  // Replace this with the actual user name
  };

  

  logout() {
    // Clear user session or token
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}

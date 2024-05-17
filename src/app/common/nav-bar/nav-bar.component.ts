import { Component, Input } from '@angular/core';
import { NavigationServiceService } from '../services/navigation-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() topNavMenu: any = [];

  constructor(
    private navService: NavigationServiceService
  ) {

  }

  goBack(event: any) {
    this.navService.back();
  }
}

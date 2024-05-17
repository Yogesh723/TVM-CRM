import { Component } from '@angular/core';
import { NavigationServiceService } from './common/services/navigation-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TVM';
  constructor(
    private navigation: NavigationServiceService
  ) {}
}

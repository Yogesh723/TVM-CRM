import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommunicationService } from '../communication.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

  private history: string[] = [];

  constructor(private router: Router, private comunicationService: CommunicationService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        comunicationService.goBack$.subscribe((goBack: any) => {
          if (!goBack) {
            if (this.history[this.history.length - 1] !== event.urlAfterRedirects) {
              this.history.push(event.urlAfterRedirects);
            }
          }
        });
      }
    });
  }

  get historyList(): string[] {
    return this.history;
  }



  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
        setTimeout(() => {
          this.router.navigateByUrl(this.history[this.history.length - 1]);
          this.comunicationService.goBackClick(true);
        });
    }
  }

}

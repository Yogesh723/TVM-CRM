import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  
  constructor() { }

  private goBack = new BehaviorSubject<any>(false);
  private activeSection = new Subject<any>();


  goBack$ = this.goBack.asObservable();
  activeSection$ = this.activeSection.asObservable();


  goBackClick(event: boolean) {
    this.goBack.next(event);
  }

  confirmActiveSection(event: any) {
    this.activeSection.next(event);
  }
}

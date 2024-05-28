import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  
  constructor() { }

  private goBack = new BehaviorSubject<any>(false);
  private activeSection = new Subject<any>();
  private activeId = new Subject<any>();

  goBack$ = this.goBack.asObservable();
  activeSection$ = this.activeSection.asObservable();
  activeId$ = this.activeId.asObservable();

  goBackClick(event: boolean) {
    this.goBack.next(event);
  }

  confirmActiveSection(event: any) {
    this.activeSection.next(event);
  }

  confirmActiveId(id: any) {
    this.activeId.next(id);
  }
}

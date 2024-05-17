import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  
  constructor() { }

  private goBack = new BehaviorSubject<any>(false);

  goBack$ = this.goBack.asObservable();

  goBackClick(event: boolean) {
    this.goBack.next(event);
  }
}

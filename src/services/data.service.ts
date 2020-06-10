import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  message = new BehaviorSubject('');
  sharedMessage = this.message.asObservable();

  constructor() { }

  nextMessage(message: string): void {
    this.message.next(message);
  }
}

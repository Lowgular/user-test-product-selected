import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private readonly eventBus = new Subject<number>();

  listen(): Observable<number> {
    return this.eventBus.asObservable();
  }

  emit(event: number) {
    this.eventBus.next(event);
  }
}

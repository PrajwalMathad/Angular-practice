import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  constructor() { }

  createTask = new Subject<string>();

  onCreateTask = (data: string) => {
    this.createTask.next(data);
  }
}

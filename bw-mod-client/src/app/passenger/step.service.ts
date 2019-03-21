import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private step = 0;
  private stepSubject = new BehaviorSubject<number>(0);

  constructor() { }
  setStep(value: number) {
    this.step = value;
    this.stepSubject.next(this.step);
  }
  nextStep() {
    this.step++;
    this.stepSubject.next(this.step);
  }
  previousStep() {
    this.step--;
    this.stepSubject.next(this.step);
  }
  atStep$ = this.stepSubject.asObservable();

}

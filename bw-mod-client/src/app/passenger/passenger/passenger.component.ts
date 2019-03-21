import { StepService } from './../step.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { StartConversation } from 'src/generated/graphql';
import { Observable } from 'rxjs';


/**
 * todo:
 * move stuff from passengerlist
 * passengerlist has the additionalfields of all the pax,
 * per pax this needs to be passed as input to this passenger component
 */
@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {
  @Input() formFields: FormArray; 
  @Input() fieldsMap;  
  @Input() passengers: StartConversation.Passengers;
  @Input() index: number;
  @Input() numberOfPassengers: number;
  passengerForm: FormGroup;
  passengerId: string;
  step: number; 

  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.stepService.atStep$.subscribe(step => this.step = step);
    console.log('passengers:', this.passengers);
    console.log('index:', this.index);
    this.passengerId = this.passengers[this.index].id;
    console.log('passenger id', this.passengerId);
    console.log('passengerform fields:', this.formFields);
    this.passengerForm = this.formFields[this.passengerId] as FormGroup;
    console.log('passengerform:', this.passengerForm);
  }
  nextStep() {
    this.stepService.nextStep();
  }
  prevStep() {
    this.stepService.previousStep();
  }
  setStep(step) {
    this.stepService.setStep(step);
  }

}

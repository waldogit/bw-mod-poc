import { passengerEntries } from '../../../../bw-mod-server/src/shared/fake-data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Passenger, GetConversationGQL, GetPassengerAndPaymentEntriesGQL } from 'src/generated/graphql';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { map, tap, filter } from 'rxjs/operators';
import { Observable, AsyncSubject, from, zip } from 'rxjs';
import { StepService } from './step.service';


@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss'],
  providers: [StepService]
})
/**
 * - start a watch query on passengers
 * - build a form based on the conversation passengers (which only have a passengertype)
 * - when order api get order returns, including passengerfields, extend the form accordingly
 */
export class PassengerListComponent implements OnInit {
  convId: string;
  orderId: string;
  passengerList: Passenger[];
  form: FormGroup;
  step = 0;
  passengerFormGroupMap = {}; // passenger form keyed by passenger id
  passengerAdditionalMap = {}; // additional fields array by passenger id
  private passengers$: Observable<Passenger[]>;
  // make a form array for each passenger
  // within a passenger, make a form group for the fixed fields
  // and a form array for the additional fields

  constructor(private stepService: StepService, private fb: FormBuilder, private getConversation: GetConversationGQL, private getPassengerFields: GetPassengerAndPaymentEntriesGQL, 
    private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.convId = this.route.snapshot.paramMap.get('convId');
    this.form = this.fb.group({passengers: this.fb.array([])});
    this.passengers$ = this.getConversation.watch({ convId: +this.convId }, {fetchPolicy: "cache-only"}).valueChanges.pipe(
      tap(x => console.log('wwwwwwwwwwwwwwwwww1', x)),
      filter(result => !!(result.data && result.data.conversation && result.data.conversation.passengers)),
      map(result => result.data.conversation.passengers),
      tap(x => this.passengerList = x),
      tap(convPassengers => {
        convPassengers.forEach(pax => this.buildPassengerControl(pax));
      }),
      tap(x => console.log('form after patching in conv passengers', this.form)),
    );
    zip(
      from(this.passengers$),
      this.getPassengerFields.fetch({ convId: +this.convId}),
      (form, field) => field
    ).subscribe(result => {
        console.log('incoming passengerfields==============: ', result.data);
        result.data.passengerAndPaymentEntries.passengerEntries.forEach(
          passengerEntry => {
            if (passengerEntry.additionalFields) {
              console.log('====================1',passengerEntry.passengerId);
              console.log('====================2', this.passengerFormGroupMap[passengerEntry.passengerId]);
              this.passengerAdditionalMap[passengerEntry.passengerId] = passengerEntry.additionalFields;
              passengerEntry.additionalFields.forEach(additionalField => 
                this.passengerFormGroupMap[passengerEntry.passengerId].get('additionalFields').addControl(additionalField.fieldId, new FormControl('')))
            }
          }
        )
      });
  }


    
  buildPassengerControl(passenger: Passenger) {
    console.log('>>>>>>>map+', passenger.id);
    const additionalFields = new FormGroup({});
    const passengerFormArray: any = this.form['controls'].passengers;
    const passengerFormGroup = 
    new FormGroup({
      fullName: new FormControl(''),
      birthDate: new FormControl(''),
      emailAddress: new FormControl(''),
      additionalFields: additionalFields,
    });
    passengerFormArray.push(passengerFormGroup);
    this.passengerFormGroupMap[passenger.id] = passengerFormGroup;

  }
  sendPassengers() {
    console.log('submitting passenger form', this.form);
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setStep(index: number) {
    this.step = index;
  }

}

import { passengerEntries } from '../../../../bw-mod-server/src/shared/fake-data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Passenger, ConversationFragmentFragment, GetPassengerAndPaymentEntriesGQL } from 'src/generated/graphql';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
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

  constructor(private apollo: Apollo, private stepService: StepService, private fb: FormBuilder, private getPassengerFields: GetPassengerAndPaymentEntriesGQL,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.convId = this.route.snapshot.params['convId'];
    console.log('about to get from cache object with conv id ' + this.convId);
    this.form = this.fb.group({passengers: this.fb.array([])});
    const objectId = 'Conversation:' + this.convId;
    const convFromCache = this.apollo.getClient().readFragment({
      id: objectId,
      fragment: ConversationFragmentFragment
    });
    console.log('conv from cache read frag', convFromCache);
    const convPassengers = convFromCache.passengers;
    this.passengerList = convPassengers;
    convPassengers.forEach(pax => this.buildPassengerControl(pax));
    this.getPassengerFields.fetch({ convId: +this.convId}).subscribe(result => {
        console.log('incoming passengerfields==============: ', result.data);
        result.data.passengerAndPaymentEntries.passengerEntries.forEach(
          passengerEntry => {
            if (passengerEntry.additionalFields) {
              console.log('====================1', passengerEntry.passengerId);
              console.log('====================2', this.passengerFormGroupMap[passengerEntry.passengerId]);
              this.passengerAdditionalMap[passengerEntry.passengerId] = passengerEntry.additionalFields;
              passengerEntry.additionalFields.forEach(additionalField =>
                this.passengerFormGroupMap[passengerEntry.passengerId].get('additionalFields').addControl(additionalField.fieldId, new FormControl('')));
            }
          }
        );
        console.log('subscribed', this);
      });
      console.log('end of init', this);
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

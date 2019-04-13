import { FieldEntry } from './../../../generated/graphql';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'additional-field',
  templateUrl: './additional-field.component.html',
  styleUrls: ['./additional-field.component.scss']
})
export class AdditionalFieldComponent implements OnInit {
  @Input() additional: FieldEntry;
  @Input() index: number
  @Input() passengerId: string;
  @Input() passengerForm: FormGroup;
  fieldId: string;
  fieldDescription: string;
  fieldLabel: string;
  fieldForm: FormGroup; 

  constructor() { }

  ngOnInit() {
    console.log("additional field passenger additional", this.additional);
    this.fieldId = this.additional.fieldId;
    this.fieldDescription = this.additional.fieldDescription;
    this.fieldLabel = this.additional.fieldLabel;
    this.fieldForm = this.passengerForm.get('additionalFields') as FormGroup;
    console.log(this.passengerId, 'field form', this.fieldForm);
  }

}

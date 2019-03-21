import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerListComponent } from './passenger-list.component';
import { PassengerComponent } from './passenger/passenger.component';
import { PassengerRoutingModule } from './passenger-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdditionalFieldComponent } from './additional-field/additional-field.component';

@NgModule({
  declarations: [PassengerListComponent, PassengerComponent, AdditionalFieldComponent],
  imports: [
    CommonModule,
    PassengerRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PassengerModule { }

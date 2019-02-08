import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerComponent } from './passenger.component';
import { PassengerRoutingModule } from './passenger-routing.module';

@NgModule({
  declarations: [PassengerComponent],
  imports: [
    CommonModule,
    PassengerRoutingModule
  ]
})
export class PassengerModule { }

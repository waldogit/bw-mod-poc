import { Flights } from './../../../generated/graphql';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FlightsGQL } from '../../../generated/graphql';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  flights: Flights.Flights[];
  passengerTypes: String[];
  convId: string;
  outBound: Flights.Flights[];
  homeBound: Flights.Flights[];
  oneTo10: number[];
  outbound: Flights.Flights[];
  homebound: Flights.Flights[];
  adultCount: number;
  childCount: number;
  infantCount: number;
  
  constructor(private getFlights: FlightsGQL, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.getFlights.fetch()
    .subscribe(result => {
      this.flights = result.data.flights})
      this.convId = this.route.snapshot.paramMap.get('convId');
      console.log('============== convid', this.convId);
      this.passengerTypes = [];
      this.oneTo10 = [1,2,3,4,5,6,7,8,9,10];
  }
  addConversation() {
    console.log('=============== continue', this);
    console.log('=====outbound', this.outbound);
    console.log('=====homebound', this.homebound);
    console.log('=====adultCount', this.adultCount);
    console.log('=====childCount', this.childCount);
    console.log('=====infantCount', this.infantCount);
  }
  updateOutbound(outboundFlights) {
    this.outbound = outboundFlights;
    console.log('===========updating outbound', this.outbound);
  }
  updateHomebound(homeboundFlights) {
    this.homebound = homeboundFlights;
    console.log('===========updating outbound', this.homebound);
  }
  updateAdultCount(adultCount) {
    this.adultCount = adultCount;
  }
  updateChildCount(childCount) {
    this.childCount = childCount;
  }
  updateInfantCount(infantCount) {
    this.infantCount = infantCount;
  }

}

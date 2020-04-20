import { ConversationFragmentFragment, Flight, ConversationInput, FlightsGQL, StartConversationGQL } from './../../../generated/graphql';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  flights: Flight[];
  passengerTypes: String[];
  convId: string;
  outboundSelected: number;
  homeboundSelected: number;
  oneTo10: number[];
  outboundFlights: Flight[];
  homeboundFlights: Flight[];
  adultCount: number;
  childCount: number;
  infantCount: number;

  constructor(
    private getFlights: FlightsGQL,
    private startConversation: StartConversationGQL,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getFlights.fetch()
    .subscribe(result => {
      this.flights = result.data.flights})
      this.passengerTypes = [];
      this.oneTo10 = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
  addConversation() {
    const input: ConversationInput = {
      outbound: [ +this.outboundSelected ],
      homebound: [ +this.homeboundSelected ],
      passengerCounts: {
        adult: +this.adultCount,
        child: +this.childCount,
        infant: +this.infantCount
      }
    };
    console.log('adding conversation', input);
    this.startConversation.mutate({conversation: input}).subscribe(result => {
      console.log('=====================start conv result.data', result.data.conversation);
      this.router.navigate([`../passenger/${result.data.conversation.convId}`]);

    });
  }
  updateOutbound(outbound: number) {
    this.outboundSelected = outbound;
  }
  updateHomebound(homebound: number) {
    this.homeboundSelected = homebound;
  }
  updateAdultCount(adultCount: number) {
    this.adultCount = adultCount;
  }
  updateChildCount(childCount: number) {
    this.childCount = childCount;
  }
  updateInfantCount(infantCount: number) {
    this.infantCount = infantCount;
  }

}

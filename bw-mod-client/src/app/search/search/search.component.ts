import { Flights, ConversationInput, FlightsGQL, StartConversationGQL } from './../../../generated/graphql';
import gql from "graphql-tag";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  flights: Flights.Flights[];
  passengerTypes: String[];
  convId: string;
  outboundSelected: number;
  homeboundSelected: number;
  oneTo10: number[];
  outboundFlights: Flights.Flights[];
  homeboundFlights: Flights.Flights[];
  adultCount: number;
  childCount: number;
  infantCount: number;
  
  constructor(private getFlights: FlightsGQL, private startConversation: StartConversationGQL, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.getFlights.fetch()
    .subscribe(result => {
      this.flights = result.data.flights})
      this.passengerTypes = [];
      this.oneTo10 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
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
    this.startConversation.mutate({conversation: input}, {update: (cache, res) => {
      cache.writeQuery({
          query: gql`
          query getConversation($convId: Int) {
            getConversation(convId: $convId) {
              id
              convId
              itinerary {
                price {
                  currencyCode
                  amount
                }
                connections {
                  connectionType
                  segments {
                    toAirport
                    fromAirport
                    fare {
                      currencyCode
                      amount
                    }
                    arrivalDate
                    departureDate
                  }
                }
              }
              passengers {
                passengerType
              }
            }
          }
        `,
        variables: {
            convId: res.data.startConversation.convId
        },
        data: res.data
      })
  }}).subscribe(result => {
      console.log('=====================start conv result.data.startConversation', result.data.startConversation);
      this.router.navigate([`../passenger/${result.data.startConversation.convId}`]);

    })
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

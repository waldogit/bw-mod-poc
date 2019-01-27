export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

export namespace Flights {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    flights: Maybe<(Maybe<Flights>)[]>;
  };

  export type Flights = {
    __typename?: "Flight";

    id: Maybe<string>;

    flightcode: Maybe<string>;

    fromAirport: Maybe<string>;

    toAirport: Maybe<string>;

    departureDate: Maybe<string>;

    arrivalDate: Maybe<string>;

    fare: Maybe<Fare>;
  };

  export type Fare = {
    __typename?: "Money";

    currencyCode: Maybe<string>;

    amount: Maybe<number>;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class FlightsGQL extends Apollo.Query<Flights.Query, Flights.Variables> {
  document: any = gql`
    query flights {
      flights {
        id
        flightcode
        fromAirport
        toAirport
        departureDate
        arrivalDate
        fare {
          currencyCode
          amount
        }
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================

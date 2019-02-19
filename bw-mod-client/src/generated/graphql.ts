export type Maybe<T> = T | null;

export interface ConversationInput {
  outbound?: Maybe<(Maybe<number>)[]>;

  homebound?: Maybe<(Maybe<number>)[]>;

  passengerCounts?: Maybe<PassengerCoInput>;
}

export interface PassengerCoInput {
  adult: number;

  child: number;

  infant: number;
}

// ====================================================
// Documents
// ====================================================

export namespace GetConversation {
  export type Variables = {
    convId?: Maybe<number>;
  };

  export type Query = {
    __typename?: "Query";

    conversation: Maybe<Conversation>;
  };

  export type Conversation = {
    __typename?: "Conversation";

    id: Maybe<string>;

    convId: number;

    itinerary: Itinerary;

    passengers: (Maybe<Passengers>)[];
  };

  export type Itinerary = {
    __typename?: "Itinerary";

    price: Price;

    connections: Maybe<(Maybe<Connections>)[]>;
  };

  export type Price = {
    __typename?: "Money";

    currencyCode: Maybe<string>;

    amount: Maybe<number>;
  };

  export type Connections = {
    __typename?: "Connection";

    connectionType: string;

    segments: (Maybe<Segments>)[];
  };

  export type Segments = {
    __typename?: "Segment";

    toAirport: string;

    fromAirport: string;

    fare: Fare;

    arrivalDate: string;

    departureDate: string;
  };

  export type Fare = {
    __typename?: "Money";

    currencyCode: Maybe<string>;

    amount: Maybe<number>;
  };

  export type Passengers = {
    __typename?: "Passenger";

    passengerType: string;
  };
}

export namespace Flights {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    flights: Maybe<(Maybe<Flights>)[]>;
  };

  export type Flights = {
    __typename?: "Flight";

    id: Maybe<number>;

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

export namespace StartConversation {
  export type Variables = {
    conversation?: Maybe<ConversationInput>;
  };

  export type Mutation = {
    __typename?: "Mutation";

    conversation: Maybe<Conversation>;
  };

  export type Conversation = {
    __typename?: "Conversation";

    id: Maybe<string>;

    convId: number;

    itinerary: Itinerary;

    passengers: (Maybe<Passengers>)[];
  };

  export type Itinerary = {
    __typename?: "Itinerary";

    price: Price;

    connections: Maybe<(Maybe<Connections>)[]>;
  };

  export type Price = {
    __typename?: "Money";

    currencyCode: Maybe<string>;

    amount: Maybe<number>;
  };

  export type Connections = {
    __typename?: "Connection";

    connectionType: string;

    segments: (Maybe<Segments>)[];
  };

  export type Segments = {
    __typename?: "Segment";

    toAirport: string;

    fromAirport: string;

    fare: Fare;

    arrivalDate: string;

    departureDate: string;
  };

  export type Fare = {
    __typename?: "Money";

    currencyCode: Maybe<string>;

    amount: Maybe<number>;
  };

  export type Passengers = {
    __typename?: "Passenger";

    passengerType: string;
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
export class GetConversationGQL extends Apollo.Query<
  GetConversation.Query,
  GetConversation.Variables
> {
  document: any = gql`
    query getConversation($convId: Int) {
      conversation(convId: $convId) {
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
  `;
}
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
@Injectable({
  providedIn: "root"
})
export class StartConversationGQL extends Apollo.Mutation<
  StartConversation.Mutation,
  StartConversation.Variables
> {
  document: any = gql`
    mutation startConversation($conversation: ConversationInput) {
      conversation(conversation: $conversation) {
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
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================

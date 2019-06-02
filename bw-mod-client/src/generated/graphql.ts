type Maybe<T> = T | null;

export type AdditionalField = {
  fieldId: string;
  fieldValue?: Maybe<string>;
};

export type AdditionalFieldInput = {
  fieldId: string;
  fieldValue?: Maybe<string>;
};

export type Connection = {
  connectionType: string;
  segments: Array<Maybe<Segment>>;
};

export type Conversation = {
  id: string;
  convId: number;
  itinerary: Itinerary;
  passengers: Array<Maybe<Passenger>>;
};

export type ConversationInput = {
  outbound: Maybe<Array<Maybe<number>>>;
  homebound: Maybe<Array<Maybe<number>>>;
  passengerCounts: Maybe<PassengerCoInput>;
};

export type FieldEntry = {
  fieldId: string;
  fieldLabel?: Maybe<string>;
  fieldDescription?: Maybe<string>;
  fieldRegex?: Maybe<string>;
};

export type Flight = {
  id?: Maybe<number>;
  flightcode?: Maybe<string>;
  fromAirport?: Maybe<string>;
  toAirport?: Maybe<string>;
  departureDate?: Maybe<string>;
  arrivalDate?: Maybe<string>;
  fare?: Maybe<Money>;
};

export type Itinerary = {
  price: Money;
  bookingId?: Maybe<string>;
  connections?: Maybe<Array<Maybe<Connection>>>;
};

export type Money = {
  currencyCode?: Maybe<string>;
  amount?: Maybe<number>;
};

export type Mutation = {
  conversation?: Maybe<Conversation>;
};

export type MutationConversationArgs = {
  conversation?: Maybe<ConversationInput>;
};

export type Passenger = {
  id: string;
  passengerType: string;
  fullName?: Maybe<string>;
  birthDate?: Maybe<number>;
  emailAddress?: Maybe<string>;
  additionalFields?: Maybe<AdditionalField>;
};

export type PassengerAndPaymentEntry = {
  passengerEntries?: Maybe<Array<Maybe<PassengerEntry>>>;
  paymentEntries?: Maybe<Array<Maybe<PaymentEntry>>>;
};

export type PassengerCoInput = {
  adult: number;
  child: number;
  infant: number;
};

export type PassengerEntry = {
  id: string;
  passengerId: string;
  additionalFields?: Maybe<Array<Maybe<FieldEntry>>>;
};

export type PassengerInput = {
  paxType: string;
  fullName: string;
  emailAddress: string;
  additionalFields?: Maybe<Array<Maybe<AdditionalFieldInput>>>;
};

export type PaymentEntry = {
  tbd?: Maybe<string>;
};

export type Query = {
  flights?: Maybe<Array<Maybe<Flight>>>;
  conversation?: Maybe<Conversation>;
  passengerAndPaymentEntries?: Maybe<PassengerAndPaymentEntry>;
};

export type QueryConversationArgs = {
  convId?: Maybe<number>;
};

export type QueryPassengerAndPaymentEntriesArgs = {
  convId?: Maybe<number>;
  orderId?: Maybe<string>;
};

export type Segment = {
  id?: Maybe<string>;
  fromAirport: string;
  toAirport: string;
  departureDate: string;
  arrivalDate: string;
  fare: Money;
};
export type ConversationFragmentFragment = {
  __typename?: "Conversation";
} & Pick<Conversation, "id" | "convId"> & {
    itinerary: { __typename?: "Itinerary" } & {
      price: { __typename?: "Money" } & Pick<Money, "currencyCode" | "amount">;
      connections: Maybe<
        Array<
          Maybe<
            { __typename?: "Connection" } & Pick<
              Connection,
              "connectionType"
            > & {
                segments: Array<
                  Maybe<
                    { __typename?: "Segment" } & Pick<
                      Segment,
                      | "toAirport"
                      | "fromAirport"
                      | "arrivalDate"
                      | "departureDate"
                    > & {
                        fare: { __typename?: "Money" } & Pick<
                          Money,
                          "currencyCode" | "amount"
                        >;
                      }
                  >
                >;
              }
          >
        >
      >;
    };
    passengers: Array<
      Maybe<
        { __typename?: "Passenger" } & Pick<Passenger, "id" | "passengerType">
      >
    >;
  };

export type GetConversationQueryVariables = {
  convId?: Maybe<number>;
};

export type GetConversationQuery = { __typename?: "Query" } & {
  conversation: Maybe<
    { __typename?: "Conversation" } & ConversationFragmentFragment
  >;
};

export type GetPassengerAndPaymentEntriesQueryVariables = {
  convId?: Maybe<number>;
  orderId?: Maybe<string>;
};

export type GetPassengerAndPaymentEntriesQuery = { __typename?: "Query" } & {
  passengerAndPaymentEntries: Maybe<
    { __typename?: "PassengerAndPaymentEntry" } & {
      passengerEntries: Maybe<
        Array<
          Maybe<
            { __typename?: "PassengerEntry" } & Pick<
              PassengerEntry,
              "passengerId"
            > & {
                additionalFields: Maybe<
                  Array<
                    Maybe<
                      { __typename?: "FieldEntry" } & Pick<
                        FieldEntry,
                        | "fieldId"
                        | "fieldLabel"
                        | "fieldDescription"
                        | "fieldRegex"
                      >
                    >
                  >
                >;
              }
          >
        >
      >;
    }
  >;
};

export type FlightsQueryVariables = {};

export type FlightsQuery = { __typename?: "Query" } & {
  flights: Maybe<
    Array<
      Maybe<
        { __typename?: "Flight" } & Pick<
          Flight,
          | "id"
          | "flightcode"
          | "fromAirport"
          | "toAirport"
          | "departureDate"
          | "arrivalDate"
        > & {
            fare: Maybe<
              { __typename?: "Money" } & Pick<Money, "currencyCode" | "amount">
            >;
          }
      >
    >
  >;
};

export type StartConversationMutationVariables = {
  conversation?: Maybe<ConversationInput>;
};

export type StartConversationMutation = { __typename?: "Mutation" } & {
  conversation: Maybe<
    { __typename?: "Conversation" } & ConversationFragmentFragment
  >;
};

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// GraphQL Fragments
// ====================================================

export const ConversationFragmentFragment = gql`
  fragment ConversationFragment on Conversation {
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
      id
      passengerType
    }
  }
`;

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
        ...ConversationFragment
      }
    }

    ${ConversationFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetPassengerAndPaymentEntriesGQL extends Apollo.Query<
  GetPassengerAndPaymentEntries.Query,
  GetPassengerAndPaymentEntries.Variables
> {
  document: any = gql`
    query getPassengerAndPaymentEntries($convId: Int, $orderId: String) {
      passengerAndPaymentEntries(convId: $convId, orderId: $orderId) {
        passengerEntries {
          passengerId
          additionalFields {
            fieldId
            fieldLabel
            fieldDescription
            fieldRegex
          }
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
        ...ConversationFragment
      }
    }

    ${ConversationFragmentFragment}
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================

type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AdditionalField = {
  fieldId: Scalars["String"];
  fieldValue?: Maybe<Scalars["String"]>;
};

export type AdditionalFieldInput = {
  fieldId: Scalars["String"];
  fieldValue?: Maybe<Scalars["String"]>;
};

export type Connection = {
  connectionType: Scalars["String"];
  segments: Array<Maybe<Segment>>;
};

export type Conversation = {
  id: Scalars["ID"];
  convId: Scalars["Int"];
  itinerary: Itinerary;
  passengers: Array<Maybe<Passenger>>;
};

export type ConversationInput = {
  outbound?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  homebound?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  passengerCounts?: Maybe<PassengerCoInput>;
};

export type FieldEntry = {
  fieldId: Scalars["String"];
  fieldLabel?: Maybe<Scalars["String"]>;
  fieldDescription?: Maybe<Scalars["String"]>;
  fieldRegex?: Maybe<Scalars["String"]>;
};

export type Flight = {
  id?: Maybe<Scalars["Int"]>;
  flightcode?: Maybe<Scalars["String"]>;
  fromAirport?: Maybe<Scalars["String"]>;
  toAirport?: Maybe<Scalars["String"]>;
  departureDate?: Maybe<Scalars["String"]>;
  arrivalDate?: Maybe<Scalars["String"]>;
  fare?: Maybe<Money>;
};

export type Itinerary = {
  price: Money;
  bookingId?: Maybe<Scalars["String"]>;
  connections?: Maybe<Array<Maybe<Connection>>>;
};

export type Money = {
  currencyCode?: Maybe<Scalars["String"]>;
  amount?: Maybe<Scalars["Float"]>;
};

export type Mutation = {
  conversation?: Maybe<Conversation>;
};

export type MutationConversationArgs = {
  conversation?: Maybe<ConversationInput>;
};

export type Passenger = {
  id: Scalars["ID"];
  passengerType: Scalars["String"];
  fullName?: Maybe<Scalars["String"]>;
  birthDate?: Maybe<Scalars["Int"]>;
  emailAddress?: Maybe<Scalars["String"]>;
  additionalFields?: Maybe<AdditionalField>;
};

export type PassengerAndPaymentEntry = {
  passengerEntries?: Maybe<Array<Maybe<PassengerEntry>>>;
  paymentEntries?: Maybe<Array<Maybe<PaymentEntry>>>;
};

export type PassengerCoInput = {
  adult: Scalars["Int"];
  child: Scalars["Int"];
  infant: Scalars["Int"];
};

export type PassengerEntry = {
  id: Scalars["ID"];
  passengerId: Scalars["String"];
  additionalFields?: Maybe<Array<Maybe<FieldEntry>>>;
};

export type PassengerInput = {
  paxType: Scalars["String"];
  fullName: Scalars["String"];
  emailAddress: Scalars["String"];
  additionalFields?: Maybe<Array<Maybe<AdditionalFieldInput>>>;
};

export type PaymentEntry = {
  tbd?: Maybe<Scalars["String"]>;
};

export type Query = {
  flights?: Maybe<Array<Maybe<Flight>>>;
  conversation?: Maybe<Conversation>;
  passengerAndPaymentEntries?: Maybe<PassengerAndPaymentEntry>;
};

export type QueryConversationArgs = {
  convId?: Maybe<Scalars["Int"]>;
};

export type QueryPassengerAndPaymentEntriesArgs = {
  convId?: Maybe<Scalars["Int"]>;
  orderId?: Maybe<Scalars["String"]>;
};

export type Segment = {
  id?: Maybe<Scalars["String"]>;
  fromAirport: Scalars["String"];
  toAirport: Scalars["String"];
  departureDate: Scalars["String"];
  arrivalDate: Scalars["String"];
  fare: Money;
};
export type GetConversationQueryVariables = {
  convId?: Maybe<Scalars["Int"]>;
};

export type GetConversationQuery = { __typename?: "Query" } & {
  conversation: Maybe<
    { __typename?: "Conversation" } & Pick<Conversation, "id" | "convId"> & {
        itinerary: { __typename?: "Itinerary" } & {
          price: { __typename?: "Money" } & Pick<
            Money,
            "currencyCode" | "amount"
          >;
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
            { __typename?: "Passenger" } & Pick<
              Passenger,
              "id" | "passengerType"
            >
          >
        >;
      }
  >;
};

export type GetPassengerAndPaymentEntriesQueryVariables = {
  convId?: Maybe<Scalars["Int"]>;
  orderId?: Maybe<Scalars["String"]>;
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
    { __typename?: "Conversation" } & Pick<Conversation, "id" | "convId"> & {
        itinerary: { __typename?: "Itinerary" } & {
          price: { __typename?: "Money" } & Pick<
            Money,
            "currencyCode" | "amount"
          >;
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
            { __typename?: "Passenger" } & Pick<
              Passenger,
              "id" | "passengerType"
            >
          >
        >;
      }
  >;
};

import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

export const GetConversationDocument = gql`
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
        id
        passengerType
      }
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class GetConversationGQL extends Apollo.Query<
  GetConversationQuery,
  GetConversationQueryVariables
> {
  document = GetConversationDocument;
}
export const GetPassengerAndPaymentEntriesDocument = gql`
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

@Injectable({
  providedIn: "root"
})
export class GetPassengerAndPaymentEntriesGQL extends Apollo.Query<
  GetPassengerAndPaymentEntriesQuery,
  GetPassengerAndPaymentEntriesQueryVariables
> {
  document = GetPassengerAndPaymentEntriesDocument;
}
export const FlightsDocument = gql`
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

@Injectable({
  providedIn: "root"
})
export class FlightsGQL extends Apollo.Query<
  FlightsQuery,
  FlightsQueryVariables
> {
  document = FlightsDocument;
}
export const StartConversationDocument = gql`
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
        id
        passengerType
      }
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class StartConversationGQL extends Apollo.Mutation<
  StartConversationMutation,
  StartConversationMutationVariables
> {
  document = StartConversationDocument;
}

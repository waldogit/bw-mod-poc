import { GraphQLModule } from '@graphql-modules/core';
import { AncillariesProvider } from './providers/ancillaries-provider';
import resolvers from './resolvers';
import gql from 'graphql-tag';

export const AncillariesModule = new GraphQLModule({
  providers: [AncillariesProvider],
  resolvers,
  typeDefs: gql`
    input ConversationInput {
      outbound: [Int]
      homebound: [Int]
      passengerCounts: PassengerCoInput
    }

    input PassengerCoInput {
        adult: Int!
        child: Int!
        infant: Int!
    }
  
    type Passenger {
      id: String
      passengerType: String!
    }

    type Connection {
      connectionType: String!
      segments: [Segment] !
    }

    # base class for connection and segment
    type Segment {
      id: String
      fromAirport: String!
      toAirport: String!
      departureDate: String!
      arrivalDate: String!
      fare: Money!
    }

    type Money {
      currencyCode: String
      amount: Float
    }

    type Itinerary {
      price: Money!
      bookingId: String
      connections: [Connection]
    }

    type Conversation {
      id: ID
      convId: Int!
      itinerary: Itinerary!
      passengers: [Passenger]!
    }

    type Query {
      conversation(convId: Int): Conversation
    }

    type Mutation {
        conversation(conversation: ConversationInput): Conversation
    }
  `,
});

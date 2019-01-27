import { GraphQLModule } from '@graphql-modules/core';
import { FlightofferProvider } from './providers/flightoffer-provider';
import resolvers from './resolvers';
import gql from 'graphql-tag';

export const FlightoffersModule = new GraphQLModule({
  providers: [FlightofferProvider],
  resolvers,
  typeDefs: gql`
    type Flight {
      id: String
      flightcode: String
      fromAirport: String
      toAirport: String
      departureDate: String
      arrivalDate: String
      fare: Money
    }

    type Money {
      currencyCode: String
      amount: Float
    }

    type Query {
      flights: [Flight]
    }
  `,
});

import { OrdersModule } from './modules/orders/index';
import { AncillariesModule } from './modules/ancillaries/index';
import { GraphQLModule } from '@graphql-modules/core';
import { FlightoffersModule } from './modules/flightoffers';

export const AppModule = new GraphQLModule({
  imports: [
    FlightoffersModule,
    AncillariesModule,
    OrdersModule
  ],
});

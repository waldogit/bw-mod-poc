import { FlightofferProvider } from '../providers/flightoffer-provider';
import { ModuleContext } from '@graphql-modules/core';

export default {
    Query: {
        flights: (root, args, {injector}: ModuleContext) => injector.get(FlightofferProvider).getAllFlightoffers()
    }
}

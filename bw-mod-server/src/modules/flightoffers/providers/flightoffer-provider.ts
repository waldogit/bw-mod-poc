import { Injectable } from '@graphql-modules/di';

import { flightOffers } from '../../../shared/flights'

@Injectable()
export class FlightofferProvider {
  getAllFlightoffers() {
    return flightOffers;

  }
}

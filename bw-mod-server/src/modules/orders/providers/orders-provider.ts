import { conversations, passengerEntries } from '../../../shared/fake-data';
import { PassengerOrEntry, FieldEntry, PassengerAndPaymentEntries } from '../types/types'
import { Injectable } from '@graphql-modules/di';

@Injectable()
export class OrdersProvider {
    getPassengerAndPaymentEntries(convId: number, orderId: string) {
        // haal conv op by id
        const conversation = conversations[convId];
        const paxEntries = [];
        passengerEntries.set(convId, paxEntries);
        // console.log('========================', convId, conversation);
        
        // genereer pax entries adhv pax type
        conversation.passengers.forEach(pax => paxEntries.push(
            new PassengerOrEntry(pax.passengerType, 
                new FieldEntry('fullName', 'fullname', 'Full Name', '*'),
                pax.passengerType === 'adult' ? new FieldEntry('emailAddress', 'Email Address', 'Email Address', '*'): null,
                conversation.itinerary.connections[0].fromAirport === 'BCN' ? [new FieldEntry('passportId', 'Passport Id', 'Passport Id', '*')]: null)));
        // genereer payment entries adhv orig / dest
        return new PassengerAndPaymentEntries(paxEntries, null, null);
    }
}
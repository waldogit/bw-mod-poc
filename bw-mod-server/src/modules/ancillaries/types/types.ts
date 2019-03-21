export interface ConversationInput {
    convId: number;
    outbound: number[];
    homebound: number[];
    passengerCounts: PassengerCoInput

}
export interface PassengerCoInput {
    adult: number;
    childC: number;
    infant: number;
}
export interface Segment {
    fromAirport: string;
    toAirport: string;
    departureDate: string;
    arrivalDate: string;
    fare: Money
    
}
export interface Money {
    currencyCode: string;
    amount: number;
}

export class Conversation {
    totalPrice: Money;
    passengers: PassengerAn[] = [];
    constructor(public convId: number, public itinerary: Itinerary, passengerCounts: PassengerCoInput) {
        this.passengers = [];
        ["adult", "child", "infant"].forEach(paxType => {
            for (let i = 0; i < passengerCounts[paxType]; i++) {
                this.passengers.push(new PassengerAn(convId + 'Passenger' + paxType + i, paxType));
            }
        });
        const paxRate = {
            "adult": 1,
            "child": .7,
            "infant": 0
        };
        const totalAmount = this.passengers.reduce((acc, pax) => acc + this.itinerary.price.amount * paxRate[pax.passengerType], 0)
        this.totalPrice = {
            currencyCode: this.itinerary.price.currencyCode,
            amount: totalAmount
        }
    }
}
export class Itinerary {
    price: Money;
    constructor(public connections: Connection[]) {
        const itineraryAmount = connections.reduce((acc, connection) => acc + connection.fare.amount, 0);
        this.price = {
            currencyCode: connections[0].fare.currencyCode,
            amount: itineraryAmount
        }
    }
}

export class PassengerAn {
    constructor(public id: string, public passengerType: string) {};
}

export class Connection implements Segment {
    fromAirport: string;
    toAirport: string;
    departureDate: string;
    arrivalDate: string;
    fare: Money
    constructor(public segments: Segment[], public connectionType: string, public convId) {
        this.fromAirport = segments[0].fromAirport;
        this.departureDate = segments[0].departureDate;
        const lastSegment = segments[segments.length - 1];
        this.toAirport = lastSegment.toAirport;
        this.arrivalDate = lastSegment.arrivalDate;
        const totalAmount = segments.reduce((acc, seg) => acc + seg.fare.amount, 0);
        this.fare = {
            currencyCode: lastSegment.fare.currencyCode,
            amount: totalAmount
        }
    }
}

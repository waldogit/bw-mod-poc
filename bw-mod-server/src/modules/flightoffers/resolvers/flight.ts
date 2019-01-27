export default {
    Flight: {
        id: flight => flight.id,
        flightcode: flight => flight.flightcode,
        fromAirport: flight => flight.fromAirport,
        toAirport: flight => flight.toAirport,
        departureDate: flight => flight.departureDate,
        arrivalDate: flight => flight.arrivalDate,
        fare: flight => flight.fare
    }
};

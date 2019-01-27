# exploration of GQL module and cache

modules center around a certain (here mocked) API. This way, resolvers and providers are focused and response types are scoped within a single module.
Because the schema is composed of all the modiles, the schema can be cient focused while the modules are API focused.

Pattern where types can be shared, but each type sort of has a 'home' module where there is a [type]Entry extension:
- Payment : checkout PaymentEntry
- Ancillary: ancillary AncillaryEntry
but what is the home of Passenger?
I guess there is not a single 'home' for Passenger, so:
- Passenger :
    - order: PassengerEntryOr
    - profile: PassengerEntryPR

 This is unrelated to module order because the Entry types are not supposed to be used outside their own module

 Passenger: you could argue that Search provides the most basic Passenger: just a pax type

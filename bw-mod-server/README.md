# exploration of GQL module and cache

modules center around a certain (here mocked) API. This way, resolvers and providers are focused and response types are scoped within a single module.
Because the schema is composed of all the modules, the schema can be client focused while the modules are API focused.

Pattern where types can be shared, but each type sort of has a 'home' module where there is a [type]Entry extension:
- Payment : checkout PaymentEntry
- Ancillary: ancillary AncillaryEntry
but what is the home of Passenger?
I guess there is not a single 'home' for Passenger, so:
- Passenger :
    - order: PassengerEntryOr
    - profile: PassengerEntryPr

 This is unrelated to module order because the Entry types are not supposed to be used outside their own module

 Passenger: you could argue that Search provides the most basic Passenger: just a pax type

 The idea is that once we know the number of adults children and infants, we can already show a passenger entry screen.
 This screen gets amended on the fly responding to asynchronously arriving order passengerfields. Here is where the intention of the api is at odds with a progressive UX. Which fields should be entered per passenger type should be frontend knowledge.
 A data driven API should be applied only when really required. For instance when certain fields are required per POS.

 If that is how fields can be amended on the fly, the next challenge is how to integrate that into the flow. If the user progressed in the id page, but meanwhile fields got added to already entered passengers, what do we do? 
 - automatically give focus to the first missing required field? But what about new optional fields? How to bring those to the attention of the user?
 - give some visual clue that something has changed? Does a user understand that the form suddenly got entry fields added?

 Some guiding principles:
 the UX should be smooth and reassuring
 most of the time there is only a single passenger 
 the continue button should probably be disabled until the order passengerfields have arrived
 optional added fields should not go unnoticed.
 Maybe everything that gets added via the order api should go into a separate section (still per passenger!)
 Maybe that section uses another colour, and we add that color to the expansion header of passed (based on the expansion step) passengers. But there should be an alternative for colour blind users. Maybe UX can add some section icon which can be added to expansion headers.

Technically: how to get the additionalfields in?
separate watch query? How to map those to the passengers in the conversation?

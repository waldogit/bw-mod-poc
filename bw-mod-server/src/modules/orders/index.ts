import { AncillariesModule } from './../ancillaries/index';
import { GraphQLModule } from '@graphql-modules/core';
import { OrdersProvider } from './providers/orders-provider';
import resolvers from './resolvers';
import gql from 'graphql-tag';

export const OrdersModule = new GraphQLModule({
    imports: [ AncillariesModule ],
    providers: [OrdersProvider],
    resolvers,
    typeDefs: gql`
        type Passenger {
            fullName: String
            emailAddress: String
        }
        type PassengerInput {
            paxType: String!
            fullName: String!
            emailAddress: String!
            additionalFields : [AdditionalFieldInput]
        }
        type AdditionalFieldInput {
            fieldId: String!
            fieldValue: String
        }
        type FieldEntry {
            fieldId: String!
            fieldLabel: String
            fieldDescription: String
            fieldRegex: String
        }
        type PassengerEntry {
            passengerType: String!
            fullName: FieldEntry
            emailAddress: FieldEntry
            additionalFields: [FieldEntry]
        }
        type PaymentEntry {
            tbd: String
        }
        # enum NotificationType {
        #     ERROR
        #     WARNING
        # }
        # type TranslatableNotification {
        #     notificationType: NotificationType
        #     notificationKey: String
        # }
        # type TranslatedNotification {
        #     notificationType: NotificationType
        #     notification: String
        # }
        type PassengerAndPaymentEntry {
            passengerEntries: [PassengerEntry]
            paymentEntries: [PaymentEntry]
            # notifications: [TranslatableNotification | TranslatedNotification]
            # apiSpecifics: ApiSpecifics
        }
        # type ApiSpecifics {
        #     orderId: String
        # }
        type Query {
            passengerAndPaymentEntries(convId: Int, orderId: String): PassengerAndPaymentEntry
            #paymentEntries(convId: Int, orderId: String): [PaymentEntry]
        }
        # type Mutation {
            #postPassengers(convId: String, orderId: String, passengers: )
        # }
    `,
});

import { AncillariesProvider } from '../providers/ancillaries-provider';
import { ModuleContext } from '@graphql-modules/core';

export default {
    Mutation: {
        // addPassenger: (root, { passenger }, { injector }: ModuleContext) => injector.get(PassengerProvider).addPassenger(passenger)
        startConversation: (root, { conversation } , { injector }: ModuleContext) => injector.get(AncillariesProvider).startConversation(conversation)
    }
}

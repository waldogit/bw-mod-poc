import { AncillariesProvider } from '../providers/ancillaries-provider';
import { ModuleContext } from '@graphql-modules/core';

export default {
    Query: {
        getConversation: (root, { convId }, { injector }: ModuleContext) => injector.get(AncillariesProvider).getConversation(convId)
    }
}

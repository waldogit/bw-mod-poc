/* 
import { ModuleContext } from '@graphql-modules/core';
import { OrdersProvider } from '../providers/orders-provider';

export default {
    Query: {
        passengerAndPaymentEntries: (root, {convId, orderId }, { injector }: ModuleContext) => injector.get(OrdersProvider).getPassengerAndPaymentEntries(convId, orderId) 
    }
}
*/
import { ModuleContext } from '@graphql-modules/core';
import { OrdersProvider } from '../providers/orders-provider';


export default {
    Query: {
        passengerAndPaymentEntries: (root, {convId, orderId }, { injector }: ModuleContext) => { return new Promise(
            function(resolve) {
                setTimeout(() => resolve(injector.get(OrdersProvider).getPassengerAndPaymentEntries(convId, orderId)),
                    2000
                );
            }
        )}
    }
}
 
import { Conversation} from '../modules/ancillaries/types/types';
import { PassengerOrEntry} from '../modules/orders/types/types';
export const conversations:  Conversation[] = [];
export const passengerEntries: Map<number, PassengerOrEntry[]> = new Map();
import { flightOffers } from './../../../shared/flights';
import { conversations } from '../../../shared/fake-data';
import { Injectable } from '@graphql-modules/di';
import { ConversationInput, Connection, Conversation, Itinerary } from '../types/types';

const passengers = [];

@Injectable()
export class AncillariesProvider {

  getConversation(convId: number): Conversation {
    return conversations[convId];
  }

  startConversation(conversationInput: ConversationInput): Conversation {
    const connections: Connection[] = [];
    connections.push(this.extractConnection(conversationInput.outbound, "outbound", conversations.length));
    connections.push(this.extractConnection(conversationInput.homebound, "homebound", conversations.length));
    const conversation = new Conversation(conversations.length, new Itinerary(connections), conversationInput.passengerCounts);
    conversations.push(conversation);

    return conversation;




  }
  extractConnection(segments: number[], connectionType, convId): Connection {
    return new Connection(segments.map(index => flightOffers[index]), connectionType, convId);
  }
}

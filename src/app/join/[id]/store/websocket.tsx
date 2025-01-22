import * as Ably from 'ably';
import { create } from 'zustand';

export interface WebSocketState {
  client: Ably.Realtime | null;
  connect: (userId: string) => void;
  disconnect: () => void;
  enterPresence: (channel: string) => void;
  leavePresence: (channel: string) => void;
  send: (channel: string, topic: string, message: any) => void;
  subscribe: (channel: string, topic: string, callback: (message: Ably.InboundMessage) => void) => void;
};

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,
  connect: (userId) => {
    const client = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_TEACHER_ABLY_API_KEY, clientId: userId });
    client.connection.on('connected', () => {
      console.log('Connection status: connected');
    });
    client.connection.on('closed', () => {
      console.log('Connection status: closed');
    });
    client.connection.on('closing', () => {
      console.log('Connection status: closing');
    });
    client.connection.on('connecting', () => {
      console.log('Connection status: connecting');
    });
    client.connection.on('disconnected', () => {
      console.log('Connection status: disconnected');
    });
    client.connection.on('failed', () => {
      console.log('Connection status: failed');
    });
    client.connection.on('initialized', () => {
      console.log('Connection status: initialized');
    });
    client.connection.on('suspended', () => {
      console.log('Connection status: suspended');
    });
    client.connection.on('update', () => {
      console.log('Connection status: update');
    });
    set({ client });
  },
  disconnect: () => {
    const client = get().client;
    if (!client) return;

    client.close();

    set({ client: null });
  },
  enterPresence: async (channel) => {
    const client = get().client;
    if (!client) return;

    await client.channels.get(channel).presence.enter();
  },
  leavePresence: (channel) => {
    const client = get().client;
    if (!client) return;

    client.channels.get(channel).presence.leave();
  },
  send: (channel, topic, message) => {
    const client = get().client;
    if (!client) return;

    const channelInstance = client.channels.get(channel);
    channelInstance.publish(topic, message);
  },
  subscribe: async (channel, topic, callback) => {
    const client = get().client;
    if (!client) return;

    const channelInstance = client.channels.get(channel);
    await channelInstance.subscribe(topic, callback);
  },
}));

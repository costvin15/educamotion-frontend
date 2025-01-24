import { create } from 'zustand';
import * as Ably from 'ably';

export interface WebSocketState {
  client: Ably.Realtime | null;
  connect: (userId: string, callback: () => void) => void;
  disconnect: () => void;
  enterPresence: (channel: string) => void;
  leavePresence: (channel: string) => void;
  send: (channel: string, topic: string, message: any) => void;
  subscribe: (channel: string, topic: string, callback: (message: Ably.InboundMessage) => void) => void;
};

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,
  connect: (userId, callback) => {
    const client = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_TEACHER_ABLY_API_KEY, clientId: userId });
    client.connection.on('connected', () => {
      callback();
    });
    set({ client });
  },
  disconnect: () => {
    const client = get().client;
    if (!client) return;

    client.close();

    set({ client: null });
  },
  enterPresence: (channel) => {
    const client = get().client;
    if (!client) return;

    client.channels.get(channel).presence.enter();
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
  subscribe: (channel, topic, callback) => {
    const client = get().client;
    if (!client) return;

    const channelInstance = client.channels.get(channel);
    channelInstance.subscribe(topic, callback);
  },
}));

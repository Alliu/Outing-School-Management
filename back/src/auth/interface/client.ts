import { Socket } from 'socket.io';

export interface client extends Socket {
  sub: { id: number; name: string };
  refresh_token?: string;
}
